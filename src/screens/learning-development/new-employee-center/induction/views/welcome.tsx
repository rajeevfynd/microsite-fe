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

  const [inductionJourney, setInductionJourney] = React.useState<JourneyDetailType>()
  const [activeCollapseKey, setActiveCollapseKey] = React.useState<string | string[] >();
  const [welcomeMessageDetails, setWelcomeMessageDetails] = React.useState({ isCompleted: false, fileUrl: '' })
  const [isInductionJourneyExists, setIsInductionJourneyExists] = React.useState<boolean>(false)

  const getWelcomeMsgUrl = () => {
    getWelcomeMessageDetails().then(res => {
      console.log(res)
      setWelcomeMessageDetails({
        fileUrl: res.data.fileUrl,
        isCompleted: res.data.completeStatus == CompleteStatus.COMPLETE
      })
      setActiveCollapseKey(() => { return (res.data.completeStatus == CompleteStatus.COMPLETE) ? '2' : '1' })
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
      setIsInductionJourneyExists(true)
    }
    )
  }

  React.useEffect(() => {
    getWelcomeMsgUrl();
    getInductionJourneyDetails();
  }, [])

  return (
    <>
      <Collapse onChange={(e: string | string[]) => { setActiveCollapseKey(e); }} activeKey={activeCollapseKey} accordion expandIconPosition='end'>
        <CollapsePanel key={'1'} header='Welcome to Jio' >
          <WelcomeMessage
            onComplete={() => { getWelcomeMsgUrl()}}
            details={welcomeMessageDetails} />
        </CollapsePanel>

        <CollapsePanel key={'2'} header='Induction Journey' disabled = {! (welcomeMessageDetails.isCompleted)}>
          {welcomeMessageDetails.isCompleted && 
            <div>
                {isInductionJourneyExists &&
                <div>
                  <JourneyDetail details={inductionJourney}></JourneyDetail>
                </div>}
                {!isInductionJourneyExists &&
                <Result
                  status="404"
                  title={<Text type='secondary'>No Active Induction Journey Found</Text>}
                /> }
            </div>
            
            }
        </CollapsePanel>
      </Collapse>
    </>
  )
}
