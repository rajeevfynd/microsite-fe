import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { getSiteFooter } from '../../../service/landing-page-service'
import "./../index.css"

const FooterHome = () => {
  return (
    <>
      <div className='footer'>{getSiteFooter()}</div>
    </>
  )
}

export default FooterHome;