import * as React from 'react'
import { EditOutlined } from '@ant-design/icons';
import ReactPlayer from 'react-player'
import "./../index.css"
import { Button, Col, Input, Modal, Row } from 'antd';
import { isUserAuthorized, getBasicUserDetails } from '../../../../../service/user-service';
import { CompleteStatus } from '../../../../../models/complete-status';

export const Welcome = () => {

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [url, setUrl] = React.useState('')
  const [updatedUrl, setUpdatedUrl] = React.useState('')
  const [play, setPlay] = React.useState(true)

  const setWelcomeFileUrl = (newUrl: string) => {
    const fetchUrl = "http://localhost:8080/microsite/lnd/welcome-message/file-url"
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
        setIsModalOpen(json.error);
      }
    ))
  }

  const getIsCompleted = () =>{
    const fetchUrl = "http://localhost:8080/microsite/lnd/user-welcome-message/status/"+ getBasicUserDetails().id.toString()
    fetch(fetchUrl).then( res => {
      res.json().then(
        json => {
          console.log(json)
          if(!json.error){
            let enumKey = json.data.status as keyof typeof CompleteStatus;
            setPlay(CompleteStatus[enumKey] == CompleteStatus.INCOMPLETE)
          }
        }
      )
    })
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
        console.log(json)
        if(!json.error){
          setPlay(false)
        }
      }
    ))
  }}

  const getWelcomeMsgUrl = () =>{
    const fetchUrl = "http://localhost:8080/microsite/lnd/welcome-message/active-url";
    fetch(fetchUrl).then(res => {
      res.json().then(
        json => {
          if(!json.error){
            setUrl(json.data.fileUrl)
          }
        }
      )
    })
  }

  React.useEffect( () => {
    getIsCompleted();
    getWelcomeMsgUrl();
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
      {!play && <a>Start/Continue with induction jounrey</a>}

      { 
        isUserAuthorized (['ADMIN-LND','ADMIN-GLOBAL']) && 
        <>
          <div className='update-welcome'>
            <Button onClick={()=>{setIsModalOpen(!isModalOpen)}}>Update File <EditOutlined/></Button>
          </div>

          <Modal 
            title="Update Welcome Message File URL" 
            visible={isModalOpen} 
            footer={null} 
            onCancel={() => {
              setIsModalOpen(!isModalOpen)
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
