import * as React from 'react'
import "./../index.css"
import { Collapse, Result, Typography } from 'antd';
import { CompleteStatus } from '../../../../../models/enums/complete-status';
import { JourneyDetailType, ProgramType } from '../../../../../models/journey-details';
import { JourneyDetail } from '../../../../../components/journey-detail/journey-detail';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import { WelcomeMessage } from './welcome-message';
import { getActiveInductionJourney, getWelcomeMessageDetails } from '../../../../../service/induction-service';
import { processPrograms } from '../../../../../service/journey-service';

const { Text } = Typography;

export const Welcome = () => {

  const [inductionJourney, setInductionJourney] = React.useState({})
  const [activeCollapseKey, setActiveCollapseKey] = React.useState('');
  const [welcomeMessageDetails, setWelcomeMessageDetails] = React.useState({ isCompleted: false, fileUrl: '' })

  const getWelcomeMsgUrl = () => {
    getWelcomeMessageDetails().then(res => {
      let enumKey = res.data.completeStatus as keyof typeof CompleteStatus;
      setWelcomeMessageDetails({
        fileUrl: res.data.fileUrl,
        isCompleted: CompleteStatus[enumKey] != CompleteStatus.INCOMPLETE
      })
      setActiveCollapseKey(() => { return (CompleteStatus[enumKey] == CompleteStatus.COMPLETE) ? '2' : '1' })
    })
  }

  const processData = (data: JourneyDetailType | any) => {
    const processedData = processPrograms(data.programs, data.flow)
    data.programs = processedData.programs;
    data.progress = processedData.progress;
    setInductionJourney(data)
  }

  const getInductionJourneyDetails = () => {
    getActiveInductionJourney().then(res => {
      processData(res.data);
    }
    )
  }

  const handleFileUrlUpdate = (fileUrl: string) => {
    getWelcomeMsgUrl()
  }

  const handleOnComplete = (isCompleted: boolean) => {
    getWelcomeMsgUrl()
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
              <Result
                status="warning"
                title={<Text type='secondary'>Please complete the welcome message before starting Induction Journey.</Text>}
              />
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
