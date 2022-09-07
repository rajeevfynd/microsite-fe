import * as React from 'react'
import { EditOutlined } from '@ant-design/icons';
import ReactPlayer from 'react-player'
import { getWelcomeFileUrl, setWelcomeFileUrl } from '../../../../../service/induction-service'
import "./../index.css"
import { Button, Col, Input, Modal, Row, message } from 'antd';
import { isUserAuthorized } from '../../../../../service/user-service';

export const Welcome = () => {
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = React.useState(getWelcomeFileUrl())
  return (
    <>
        <h1>Welcome to Jio</h1>
        <div className='video-player'>
            <ReactPlayer controls url={getWelcomeFileUrl()}></ReactPlayer>
        </div>

        { isUserAuthorized (['ADMIN-LND','ADMIN-GLOBAL']) && <>
        <div className='update-welcome'>
          <a onClick={()=>{setOpen(!open)}}>Update Welcome File <EditOutlined /></a>
        </div>
        <Modal title="Update Welcome Message File URL" visible={open} footer={null} onCancel={() => setOpen(!open)}>
          <Input.Group size='large' className='modal-welcome-url-update'>
            <Row>
              <Col span={15}>
                <Input defaultValue={url} onChange={(e) => setUrl(e.target.value)}></Input>
              </Col>
              <Col>
                <Button type='primary' size='large' 
                onClick = {() => { let status=setWelcomeFileUrl(url); status.isUpdated? message.success(status.message): message.error(status.message); setOpen(!status.isUpdated)}}>Update</Button>
              </Col>
            </Row>
            </Input.Group>
          </Modal>
        </>
      }
    </>
  )
}
