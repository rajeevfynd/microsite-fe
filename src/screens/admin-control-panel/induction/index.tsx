import * as React from 'react'
import { Collapse, Result, Typography } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import { JourneyDetail } from '../../../components/journey-detail/journey-detail';
import { CompleteStatus } from '../../../models/enums/complete-status';
import { JourneyDetailType } from '../../../models/journey-details';
import { getWelcomeMessageDetails, getActiveInductionJourney } from '../../../service/induction-service';
import { processPrograms } from '../../../service/journey-service';
import { AdminWelcomeMessage } from './welcome/admin-welcome-message';

export const AdminInduction = () => {

  const [inductionJourney, setInductionJourney] = React.useState({})
  const [activeCollapseKey, setActiveCollapseKey] = React.useState('1');
  const [welcomeMessageDetails, setWelcomeMessageDetails] = React.useState({ isCompleted: false, fileUrl: '' })

  const getWelcomeMsgUrl = () => {
    getWelcomeMessageDetails().then(res => {
      setWelcomeMessageDetails({
        fileUrl: res.data.fileUrl,
        isCompleted: res.data.completeStatus == CompleteStatus.COMPLETE
      })
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

  React.useEffect(() => {
    getWelcomeMsgUrl();
    getInductionJourneyDetails();
  }, [])

  return (
    <>
      <Collapse onChange={(e: string) => { setActiveCollapseKey(e) }} activeKey={activeCollapseKey} accordion expandIconPosition='end'>
        <CollapsePanel key={'1'} header='Welcome to Jio' >
          <AdminWelcomeMessage
            onFileUrlUpdate={() => { getWelcomeMsgUrl() }} 
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
