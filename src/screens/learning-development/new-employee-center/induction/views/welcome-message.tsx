import { Button, Modal, Input, Row, Col } from 'antd'
import { EditOutlined } from '@ant-design/icons';
import * as React from 'react'
import ReactPlayer from 'react-player'
import { WelcomeMessageDetailsType } from '../../../../../models/welcome-message';
import { CompleteStatus } from '../../../../../models/enums/complete-status';
import { setWelcomeMessageFileUrl, setWelcomeMessageStatus } from '../../../../../service/induction-service';

export const WelcomeMessage = (props: WelcomeMessageDetailsType) => {

    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [updatedUrl, setUpdatedUrl] = React.useState('')
    const [play, setPlay] = React.useState(false)
    const [fileUrl, setFileUrl] = React.useState('')

    const setWelcomeFileUrl = (newUrl: string) => {
      setWelcomeMessageFileUrl({ fileUrl : newUrl})
        .then(res => {
            setFileUrl(newUrl)
          }) 
          props.onFileUrlUpdate(newUrl)
          setIsEditModalOpen(false)
    }

    const setIsCompleted = (newStatus: CompleteStatus) => {
        if(!props.details.isCompleted){
          setWelcomeMessageStatus( {status : CompleteStatus[newStatus] })
            .then(res => {
                props.onComplete(true)
            })
            
        }
    }

    React.useEffect( () => {
      setFileUrl(props.details.fileUrl)
      setPlay(!props.details.isCompleted)
    },[])

  return (
    
    <>
        <div className='video-player'>
        <ReactPlayer 
          controls
          url={fileUrl}
          playing={play}
          onEnded={()=> setIsCompleted(CompleteStatus.COMPLETE)}
        />
      </div>
        
      { 
        true &&
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
                    defaultValue={fileUrl} 
                    onChange={(e) => {
                      setUpdatedUrl(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <Button type='primary' 
                    size='large' 
                    onClick = {() => setWelcomeFileUrl(updatedUrl) }
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
