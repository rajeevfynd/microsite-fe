import * as React from 'react'
import { getSiteFooter } from '../../../service/landing-page-service'

export default class FooterHome extends React.Component {
  render() {
    return (
      <div>{getSiteFooter()}</div>
    )
  }
}
