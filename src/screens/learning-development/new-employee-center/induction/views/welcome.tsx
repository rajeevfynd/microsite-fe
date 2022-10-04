import * as React from 'react'
import "./../index.css"
import { Collapse, Typography } from 'antd';
import { CompleteStatus } from '../../../../../models/complete-status';
import { JourneyDetailType, ProgramType } from '../../../../../models/journey-details';
import { JourneyDetail } from '../../../../../components/journey-detail/journey-detail';
import { ProgressStatus } from '../../../../../models/progress-status';
import { Flow } from '../../../../../models/flow';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import httpInstance from '../../../../../utility/http-client';
import { WelcomeMessage } from './welcome-message';
import { getUser } from '../../../../../utility/user-utils';

const { Text } = Typography;
export const Welcome = () => {

  const [inductionJourney, setInductionJourney] = React.useState({})
  const [activeCollapseKey, setActiveCollapseKey] = React.useState('');
  const [welcomeMessageDetails, setWelcomeMessageDetails] = React.useState({ isCompleted: false, fileUrl: '' })
  const user = getUser();

  const getWelcomeMsgUrl = () => {
    const url = "/microsite/lnd/user-welcome-message/active"
    httpInstance.get(url).then(res => {
      let enumKey = res.data.status as keyof typeof CompleteStatus;
      setWelcomeMessageDetails({
        fileUrl: res.data.fileUrl,
        isCompleted: CompleteStatus[enumKey] != CompleteStatus.INCOMPLETE
      })
      setActiveCollapseKey(() => { return CompleteStatus[enumKey] != CompleteStatus.INCOMPLETE ? '2' : '1' })
    }).then(val => { console.log('prom', val) })
  }

  const processData = (data: JourneyDetailType | any) => {
    const processedData = processPrograms(data.programs, data.flow)
    data.programs = processedData.programs;
    data.progress = processedData.progress;
    setInductionJourney(data)
  }

  const processPrograms = (programs: ProgramType[], flow: string) => {
    if (programs && programs.length > 0) {
      const progress = Math.round(programs.filter(program => program.status == 'COMPLETED').length * 100 / programs.length);
      let flowKey = flow as keyof typeof Flow;
      if (Flow[flowKey] == Flow.SEQUENCE)
        programs.every(program => {
          program.isActive = true;
          let enumKey = program.status as keyof typeof ProgressStatus;
          if (ProgressStatus[enumKey] != ProgressStatus.COMPLETED) {
            return false;
          }
          return true;
        })
      return {
        programs: programs,
        progress: progress
      };
    }
  }

  const getInductionJourneyDetails = () => {
    console.log('hit journey api')
    const inductionUrl = "/microsite/lnd/journeys/induction"
    httpInstance.get(inductionUrl).then(res => {
      processData(res);
    }
    )
  }

  const handleFileUrlUpdate = (fileUrl: string) => {
    setWelcomeMessageDetails(
      {
        fileUrl: fileUrl,
        isCompleted: welcomeMessageDetails.isCompleted
      }
    )
  }

  const handleOnComplete = (isCompleted: boolean) => {
    setWelcomeMessageDetails({
      fileUrl: welcomeMessageDetails.fileUrl,
      isCompleted: isCompleted
    })
  }

  React.useEffect(() => {
    getWelcomeMsgUrl();
    getInductionJourneyDetails();
  }, [])

  return (
    <>
      <Collapse onChange={(e: string) => { setActiveCollapseKey(e) }} activeKey={activeCollapseKey} accordion expandIconPosition='end'>
        <CollapsePanel key={'1'} header={<h5>Welcome to Jio</h5>} >
          <WelcomeMessage
            onFileUrlUpdate={(fileUrl: string) => { handleFileUrlUpdate(fileUrl) }}
            onComplete={(isCompleted: boolean) => { handleOnComplete(isCompleted) }}
            details={welcomeMessageDetails} />
        </CollapsePanel>

        <CollapsePanel key={'2'} header={<h5>Induction Journey</h5>}>
          {!welcomeMessageDetails.isCompleted &&
            <p>
              <Text type='secondary'> please complete welcome message to proceed with induction journey </Text>
            </p>}
          {welcomeMessageDetails.isCompleted &&
            <div>
              <JourneyDetail details={inductionJourney}></JourneyDetail>
            </div>}
        </CollapsePanel>
      </Collapse>
    </>
  )
}
