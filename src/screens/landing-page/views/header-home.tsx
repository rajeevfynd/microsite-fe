import { Avatar, Col, Dropdown, MenuProps, message, Row, Space } from 'antd'
import * as React from 'react'
import { getDefaulProPicUrl, getSiteTitle } from '../../../service/landing-page-service'
import './../index.css'
import { Image } from 'antd';
import { getUser } from '../../../utility/user-utils';
import { TopNavigationMenu } from '../../../components/menu';
import { MenuStructure } from './menu-home';
import { useLocation, useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import httpInstance from '../../../utility/http-client';
import { GET_LOGOUT_REDIRECT_URL } from '../../../constants/urls';

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

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span onClick={() => {
        httpInstance.get(GET_LOGOUT_REDIRECT_URL)
        .then((response) => {
          window.location.href = response.data;
        })
        .catch((error) => {
          message.error(error);
      });
      }}>Logout</span>,
    },
  ];

  return (
    <>
      <div className='header-container'>
        <TopNavigationMenu menu={MenuStructure(navigate)} defaultKey="home"/>
        <div className='profile-container'>


          <Dropdown menu={{items}} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
              <Avatar
              className='pro-pic'
              src={alternateProfilePic}
              icon={getDefaulProPicUrl()}
            />
              </Space>
            </a>
          </Dropdown>

        </div>
      </div>
    </>
  )
}

export default HeaderHome;

function getLogoutRedirect(): void {
  throw new Error('Function not implemented.');
}
