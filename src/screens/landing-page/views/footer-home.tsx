import * as React from 'react'
import { getSiteFooter } from '../../../service/landing-page-service'
import "./../index.css"

const FooterHome = () => {
  return (
    <>
      <div className='footer-content'>{getSiteFooter()}</div>
    </>
  )
}

export default FooterHome;