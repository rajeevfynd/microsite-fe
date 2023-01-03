import { Avatar, Dropdown, MenuProps, message, Space } from 'antd'
import * as React from 'react'
import { getDefaulProPicUrl } from '../../../service/landing-page-service'
import './../index.css'
import { getUser } from '../../../utility/user-utils';
import { TopNavigationMenu } from '../../../components/menu';
import { MenuStructure } from './menu-home';
import { useNavigate } from 'react-router-dom';
import httpInstance from '../../../utility/http-client';
import { GET_LOGOUT_REDIRECT_URL } from '../../../constants/urls';
import DownloadSvg from '../../../img/download.svg';

const HeaderHome = () => {

  const user: any = getUser()
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [domainId, setDomainId] = React.useState('');
  const [alternateProfilePic, setAlternateProfileUPic] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setDomainId(user.domainId)
      setAlternateProfileUPic(user.alternateProfilePicUrl)
    }
  })

  const items: MenuProps['items'] = [
    {
      label: <div>
                {firstName} {lastName}
                <br/>
                <small><i>{domainId}</i></small>
            </div>,
      key: '0',
    },
    {
      type: 'divider',
    },
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
      }} >Logout </span>,
    },
  ];

  return (
    <>
      <div className='header-container'>
        <TopNavigationMenu menu={MenuStructure(navigate)} defaultKey="home"/>
        <div >

          <Dropdown menu={{items}}>
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
