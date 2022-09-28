import * as React from 'react'
import { EditOutlined } from '@ant-design/icons';
import ReactPlayer from 'react-player'
import "./../index.css"
import { Button, Col, Input, Modal, Row, Avatar, List, Progress } from 'antd';
import { isUserAuthorized, getBasicUserDetails } from '../../../../../service/user-service';
import { CompleteStatus } from '../../../../../models/complete-status';
import { JourneyDetailType, ProgramType } from '../../../../../models/journey-details';
import { JourneyDetail } from '../../../../../components/journey-detail/journey-detail';
import { ProgressStatus } from '../../../../../models/progress-status';
import { Flow } from '../../../../../models/flow';

export const Welcome = () => {

  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isJourneyModalOpen, setIsJourneyModalOpen] = React.useState(false);
  const [url, setUrl] = React.useState('')
  const [updatedUrl, setUpdatedUrl] = React.useState('')
  const [play, setPlay] = React.useState(false)
  const [inductionJourney, setInductionJourney] = React.useState({})
  
  const setWelcomeFileUrl = (newUrl: string) => {
    const fetchUrl = "http://localhost:8080/microsite/lnd/user-welcome-message/file-url"
    fetch(
      fetchUrl,
      {
        method: 'POST',
        body: JSON.stringify({
          updatedBy : getBasicUserDetails().id,
          fileUrl : newUrl
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then(res => res.json().then(
      json => {
        if(!json.error){
          setUrl(newUrl)
        }
        setIsEditModalOpen(json.error);
      }
    ))
  }

  const setIsCompleted = (newStatus: CompleteStatus) => {
    const fetchUrl = "http://localhost:8080/microsite/lnd/user-welcome-message/status"
    if(play){
      fetch(
      fetchUrl,
      {
        method: 'POST',
        body: JSON.stringify({
          userId : getBasicUserDetails().id,
          status : CompleteStatus.COMPLETE
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then(res => res.json().then(
      json => {
        if(!json.error){
          setPlay(false)
          setIsJourneyModalOpen(true)
        }
      }
    ))
  }}

  const getWelcomeMsgUrl = () =>{
    const fetchUrl = "http://localhost:8080/microsite/lnd/user-welcome-message/active/" + getBasicUserDetails().id.toString();
    fetch(fetchUrl).then(res => {
      res.json().then(
        json => {
          if(!json.error){
            setUrl(json.data.fileUrl)
            let enumKey = json.data.completeStatus as keyof typeof CompleteStatus;
            setPlay(CompleteStatus[enumKey] == CompleteStatus.INCOMPLETE)
            setIsJourneyModalOpen(CompleteStatus[enumKey] == CompleteStatus.COMPLETE)
          }
        }
      )
    })
  }

  const processData = (data: JourneyDetailType) =>{
    const processedData = processPrograms(data.programs, data.flow)
    data.programs = processedData.programs;
    data.progress = processedData.progress;
    console.log(data)
    setInductionJourney(data)
  }

  const processPrograms = (programs: ProgramType[], flow: string) =>{
    if(programs && programs.length > 0){
      const progress = Math.round(programs.filter(program => program.status == 'COMPLETED').length * 100/programs.length);
      let flowKey = flow as keyof typeof Flow;
      if(Flow[flowKey] == Flow.SEQUENCE)
        programs.every(program => {
          program.isActive = true;
          let enumKey = program.status as keyof typeof ProgressStatus;
          if(ProgressStatus[enumKey] != ProgressStatus.COMPLETED){
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

  const getInductionJourneyDetails = () =>{
    const inductionUrl = "http://localhost:8080/microsite/lnd/journeys/induction/"+getBasicUserDetails().id.toString()
    fetch(inductionUrl).then(res =>{
      res.json().then(json =>{
        if(!json.error){
          processData(json.data);
        }
      })
    })
  }

  React.useEffect( () => {
    getWelcomeMsgUrl();
    getInductionJourneyDetails();
  }, [])

  return (
    <>
      <h1>Welcome to Jio</h1>
      <div className='video-player'>
        <ReactPlayer 
          url={url}
          playing={play}
          onEnded={()=>setIsCompleted(CompleteStatus.COMPLETE)}
        />
      </div>

      <Modal 
            title="Welcome"
            visible={isJourneyModalOpen}
            width={1400}
            footer={
              <Button type='primary' size='large'>Start Journey</Button>}
            onCancel={()=>{
              setIsJourneyModalOpen(!isJourneyModalOpen)
            }}
            >
              <JourneyDetail details={inductionJourney}></JourneyDetail>
          </Modal>

      { 
        isUserAuthorized (['ADMIN-LND','ADMIN-GLOBAL']) && 
        <>
          <div className='update-welcome'>
            <Button onClick={()=>{setIsEditModalOpen(!isEditModalOpen)}}>Update File <EditOutlined/></Button>
          </div>

          <Modal 
            width={700}
            title="Update Welcome Message File URL" 
            visible={isEditModalOpen} 
            footer={null} 
            onCancel={() => {
              setIsEditModalOpen(!isEditModalOpen)
            }}
          >
            <Input.Group 
              size='large' 
              className='modal-welcome-url-update'
            >
              <Row>
                <Col span={15}>
                  <Input 
                    defaultValue={url} 
                    onChange={(e) => {
                      setUpdatedUrl(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <Button type='primary' 
                    size='large' 
                    onClick = {() => setWelcomeFileUrl(updatedUrl)}
                  >
                    Update
                  </Button>
                </Col>
              </Row>
              </Input.Group>
          </Modal>
        </>
      }

    </>
  )
}
