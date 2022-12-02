import { Avatar, Col, Row } from 'antd'
import * as React from 'react'
import { getDefaulProPicUrl, getSiteTitle } from '../../../service/landing-page-service'
import './../index.css'
import { Image } from 'antd';
import { getUser } from '../../../utility/user-utils';
import { TopNavigationMenu } from '../../../components/menu';
import { MenuStructure } from './menu-home';

const HeaderHome = () => {

  const user: any = getUser()
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  React.useEffect(() => {
    if (user) {
      setFirstName(user.firstName)
      setLastName(user.lastName)
    }
  })

  return (
    <>
      <div className='header'>
        <h3 className='header-text title'>{getSiteTitle()}</h3>
        <TopNavigationMenu menu={MenuStructure} />
        <div className='profile-container'>
          <div className='username-container'>
            <h6 className='header-text username' style={{ margin: '0' }}>Welcome {firstName}!</h6>
          </div>
          <Avatar
            className='pro-pic'
            src='https://avatars.githubusercontent.com/u/20350203?v=4'
            icon={getDefaulProPicUrl()}
          />
        </div>
      </div>
    </>
  )
}

export default HeaderHome;