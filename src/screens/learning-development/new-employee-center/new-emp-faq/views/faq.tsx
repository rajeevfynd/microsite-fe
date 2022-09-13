import * as React from 'react'
import { EditOutlined } from '@ant-design/icons';
import ReactPlayer from 'react-player'
import { getWelcomeFileUrl, setWelcomeFileUrl } from '../../../../../service/induction-service'
import "./../index.css"
import { Button, Col, Input, Row , Collapse} from 'antd';
import { isUserAuthorized } from '../../../../../service/user-service';


const { Panel } = Collapse;

const onChange = (key: any) => {
    console.log(key);
};

export const FAQ = () => {
//   function updateUrl(e: React.ChangeEvent<HTMLInputElement>){
//     setUrl(e.target.value)
//   }
//   const [open, setOpen] = React.useState(false);
//   const [url, setUrl] = React.useState(getWelcomeFileUrl())
  return (
    <>
        <div>
        <h1>FAQ</h1>
            <p>
                <Button>Add Q&A</Button>
                <Button>Add</Button>    
            </p>
            <Collapse  onChange={onChange}>
            <Panel header="Question 1" key="1">
                <p>Answer 1</p>
            </Panel>
            <Panel header="Question 2" key="2">
                <p>Answer 2</p>
            </Panel>
            <Panel header="Question 3" key="3">
                <p>Answer 3</p>
            </Panel>
            </Collapse>

        </div>


        {/* <div className='video-player'>
            <ReactPlayer controls url={getWelcomeFileUrl()}></ReactPlayer>
        </div>
        { isUserAuthorized (['ADMIN-LND','ADMIN-GLOBAL']) && <>
        <div className='update-welcome'>
          <a onClick={()=>{setOpen(!open)}}>Update Welcome File <EditOutlined /></a>
        {
          open && 
          <div>
            <Input.Group size='large'>
            <Row>
              <Col span='12'>
                <Input defaultValue={url} onChange={(e) => updateUrl(e)}></Input>
              </Col>
              <Col>
                <Button type='primary' size='large' onClick={() => setWelcomeFileUrl(url)}>Update</Button>
              </Col>
            </Row>
            </Input.Group>
          </div>
        }
        </div>
        </>
      } */}
    </>
  )
}
