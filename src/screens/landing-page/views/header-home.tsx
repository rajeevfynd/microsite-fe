import { Col, Row } from 'antd'
import * as React from 'react'
import { getDefaulProPicUrl, getSiteTitle } from '../../../service/landing-page-service'
import './../index.css'
import { Image } from 'antd';
import { getUser } from '../../../utility/user-utils';

const HeaderHome = () => {
  
  const user:any = getUser()
  const [fname, setFName] = React.useState('');
  const [lname, setLName] = React.useState('')
  React.useEffect( ()=> {
    if(user){
      setFName(user.firstName)
      setLName(user.lastName)
    }
  })
  
  return (
      <>
        <Row>
          <Col span={3}>
            <h1 className='header-text title'>{getSiteTitle()}</h1>
          </Col>
          <Col span={3} offset={16}>
            <div className='username-container'>
              <h6 className='header-text username'>{fname}</h6>
              <h6 className='header-text username'>{lname}</h6>
            </div>
          </Col>
          <Col>
          <Image
              className='pro-pic'
              src=''
              fallback={getDefaulProPicUrl()}
            />
          </Col>
        </Row>
      </>
  )
}

export default HeaderHome;