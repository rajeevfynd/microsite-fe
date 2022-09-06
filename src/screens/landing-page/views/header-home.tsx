import { Col, Row } from 'antd'
import Layout from 'antd/lib/layout/layout'
import * as React from 'react'
import { getDefaulProPicUrl, getSiteTitle } from '../../../service/landing-page-service'
import { getBasicUserDetails } from '../../../service/user-service'
import './../index.css'
import { Image } from 'antd';

const HeaderHome = () => {
  
  return (
      <>
        <Row>
          <Col span={3}>
            <h1 className='header-text title'>{getSiteTitle()}</h1>
          </Col>
          <Col span={3} offset={16}>
            <div className='username-container'>
              <h6 className='header-text username'>{getBasicUserDetails().firstName}</h6>
              <h6 className='header-text username'>{getBasicUserDetails().lastName}</h6>
            </div>
          </Col>
          <Col>
          <Image
              className='pro-pic'
              width={60}
              height={60}
              src={getBasicUserDetails().proPicUrl}
              fallback={getDefaulProPicUrl()}
            />
          </Col>
        </Row>
      </>
  )
}

export default HeaderHome;