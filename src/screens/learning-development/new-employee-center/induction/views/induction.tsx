import { Button, Col, Row } from 'antd'
import * as React from 'react'
import ReactPlayer from 'react-player'
import { useNavigate } from 'react-router-dom'
import { CompleteStatus } from '../../../../../models/enums/complete-status'
import { getActiveInductionJourney, getWelcomeMessageDetails, setWelcomeMessageStatus } from '../../../../../service/induction-service'

export const Induction = () => {
    const navigate = useNavigate();
    const [welcomeMessageDetails, setWelcomeMessageDetails] = React.useState({ isCompleted: false, fileUrl: '' })
    const [journeyId, setJourneyId ] = React.useState();
    const getWelcomeMsgUrl = () => {
        getWelcomeMessageDetails().then(res => {
          setWelcomeMessageDetails({
            fileUrl: res.data.fileUrl,
            isCompleted: res.data.completeStatus == CompleteStatus.COMPLETE
          })
        })
      }
      const getInductionJourneyDetails = () => {
        getActiveInductionJourney().then(res => {
          setJourneyId(res.data.id)
        }
        )
      }

      const setIsCompleted = (newStatus: CompleteStatus) => {
        if(!welcomeMessageDetails.isCompleted){
          setWelcomeMessageStatus( {status : newStatus})
            .then(res => {
                getWelcomeMsgUrl();
                getInductionJourneyDetails();
            })
        }
        }
        
      React.useEffect(() => {
        getWelcomeMsgUrl();
        getInductionJourneyDetails();
      }, [])
  return (
    <div className='body-container'>
        <Row>
            <Col span={12}>
                <div style={{padding: '10%'}}>
                    <p style={{margin: '10% 0'}}><h1>Welcome!</h1><h4>To JioMart Marketplace</h4></p>
                    <p style={{margin: '10% 0'}}><h4>The entire team of JioMart is thrilled to welcome you on board. Its incredible to have such young, fresh and talented new member join our team. We hope you’ll do some amazing workhere!</h4></p>
                    { journeyId && welcomeMessageDetails.isCompleted && <div>
                        <p>To help you familiarize with the company its people we have put together a 2 days induction program for you.</p>
                        <Button type="primary" onClick={()=>{navigate('/lnd/learning-journey/'+journeyId)}}>Start Induction</Button>
                    </div> }
                </div>
            </Col>
            <Col span={12}>
                <div style={{padding: '20% 0'}}>
                <ReactPlayer 
                    url={welcomeMessageDetails.fileUrl}
                    light={welcomeMessageDetails.isCompleted}
                    onEnded={()=> setIsCompleted(CompleteStatus.COMPLETE)} />
                </div>
            </Col>
        </Row>
    </div>
  )
}
