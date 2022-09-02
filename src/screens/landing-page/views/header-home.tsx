import * as React from 'react'
import { getSiteTitle } from '../../../service/landing-page-service'

export default class HeaderHome extends React.Component {
  render() {
    return (
        <>
            <h1 style={{color:'#f5f5f5'}}>{getSiteTitle()}</h1>
        </>
    )
  }
}
