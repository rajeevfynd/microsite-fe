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

export const Welcome = () => {

  const [inductionJourney, setInductionJourney] = React.useState({})
  const [activeCollapseKey, setActiveCollapseKey] = React.useState('');
  const [welcomeMessageDetails, setWelcomeMessageDetails] = React.useState({ isCompleted: false, fileUrl: '' })

  const getWelcomeMsgUrl = () => {
    getWelcomeMessageDetails().then(res => {
      setWelcomeMessageDetails({
        fileUrl: res.data.fileUrl,
        isCompleted: res.data.completeStatus == CompleteStatus.COMPLETE
      })
      setActiveCollapseKey(() => { return (res.data.completeStatus == CompleteStatus.COMPLETE) ? '2' : '1' })
      console.log(res.data.completeStatus == CompleteStatus.COMPLETE)
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
    //getInductionJourneyDetails();
  }, [])

  return (
    <>
      <Collapse onChange={(e: string) => { setActiveCollapseKey(e) }} activeKey={activeCollapseKey} accordion expandIconPosition='end'>
        <CollapsePanel key={'1'} header='Welcome to Jio' >
          <WelcomeMessage
            onComplete={(isCompleted: boolean) => { handleOnComplete(isCompleted) }}
            details={welcomeMessageDetails} />
        </CollapsePanel>

        <CollapsePanel key={'2'} header='Induction Journey' disabled = {!welcomeMessageDetails.isCompleted}>
          {welcomeMessageDetails.isCompleted &&
            <div>
              <JourneyDetail details={inductionJourney}></JourneyDetail>
            </div>}
        </CollapsePanel>
      </Collapse>
    </>
  )
}
