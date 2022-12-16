import { Avatar, Col, Row } from 'antd'
import * as React from 'react'
import { getDefaulProPicUrl, getSiteTitle } from '../../../service/landing-page-service'
import './../index.css'
import { Image } from 'antd';
import { getUser } from '../../../utility/user-utils';
import { TopNavigationMenu } from '../../../components/menu';
import { MenuStructure } from './menu-home';
import { useLocation, useNavigate } from 'react-router-dom';

const HeaderHome = () => {

  const user: any = getUser()
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [alternateProfilePic, setAlternateProfileUPic] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setAlternateProfileUPic(user.alternateProfilePicUrl)
    }
  })

  return (
    <>
      <div className='header-container'>
        <TopNavigationMenu menu={MenuStructure(navigate)} defaultKey="home"/>
        <div className='profile-container'>
          {/* <div className='username-container'>
            <h6 className='header-text username' style={{ margin: '0' }}>Welcome {firstName}!</h6>
          </div> */}
          <Avatar
            className='pro-pic'
            src={alternateProfilePic}
            icon={getDefaulProPicUrl()}
          />
        </div>
      </div>
    </>
  )
}

export default HeaderHome;