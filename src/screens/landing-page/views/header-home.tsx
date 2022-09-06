import * as React from 'react'
import { getSiteTitle } from '../../../service/landing-page-service'
import './../index.css'

const HeaderHome = () => {
  return (
      <>
          <h1 className='header-title'>{getSiteTitle()}</h1>
      </>
  )
}

export default HeaderHome;