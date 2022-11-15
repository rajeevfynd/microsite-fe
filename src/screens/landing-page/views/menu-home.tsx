import * as React from 'react'
import { Button, Menu } from "antd/lib";
import { getMenuRouteKeyByPath } from '../../../service/landing-page-service';
import { useLocation, useNavigate } from 'react-router-dom';
import './../index.css'
import { Award, BookHalf, PersonWorkspace, People, Download, InfoCircle, ListColumns, Gear } from "react-bootstrap-icons";
import { MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined } from '@ant-design/icons';

import Sider from 'antd/lib/layout/Sider';
import { isUserAuthorized } from '../../../service/user-service';

export default function MenuHome() {
    const navigate = useNavigate()
    const location = useLocation()

    const [collapsed, setCollapsed] = React.useState(true)

    const navigateTo = (url: string, collapse: boolean = true) => {
        navigate(url);
        setCollapsed(collapse);
    }
    const navigateToExternal = (url: string) => {
        window.open(url,'_blank')
        setCollapsed(true);
    }
    return (
        <>  
            <Button 
                size='large'
                type='primary'
                style={{width:'50px'}}
                onClick={()=>setCollapsed(!collapsed)}
            > 
                {collapsed?<><MenuUnfoldOutlined/></>:<><MenuFoldOutlined/></>}
            </Button>

            <div className='menu-list'>
                <Sider theme='light' collapsed={collapsed} width={350} collapsedWidth={0}>
                    <Menu 
                        mode="inline" 
                        selectedKeys={getMenuRouteKeyByPath(location.pathname)} 
                        >
                        <Menu.Item onClick={()=>navigateTo('/home',false)} icon={<HomeOutlined/>}>Home</Menu.Item>
                        <Menu.SubMenu key='learning-and-development' title='Learning and Development' icon={<BookHalf/>}>
                            <Menu.SubMenu title='New Employee Center'>
                                <Menu.Item 
                                    key='induction'
                                    onClick={()=>navigateTo('/lnd/new-emp-center/induction/welcome')}>
                                        Induction</Menu.Item>
                                <Menu.Item 
                                    key='new-emp-survey'
                                    onClick={()=>navigateTo('/lnd/new-emp-center/new-emp-survey')}>
                                        New Employee Survey</Menu.Item>
                                <Menu.Item
                                    key='new-emp-faq'
                                    onClick={()=>navigateTo('/lnd/new-emp-center/new-emp-faq')}>
                                        New Employee FAQ</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu 
                                key='learning-center'
                                onTitleClick={()=>navigateTo('/lnd/learning-center/lnd-hero',false)}
                                title='Learning Center'>
                                <Menu.Item
                                    key='skill'
                                    onClick={()=>navigateTo('/lnd/learning-center/skill-courses')}>
                                        Skill</Menu.Item>
                                <Menu.Item
                                    key='role'
                                    onClick={()=>navigateTo('/lnd/learning-center/role-courses')}>
                                        Role</Menu.Item>
                                <Menu.Item
                                    key='academy'
                                    onClick={()=>navigateTo('/lnd/learning-center/academy')}>
                                        Academy</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.Item>Learning Passport</Menu.Item>
                            <Menu.Item onClick={()=>navigateTo('/lnd/learning-journey')}>Learning Journey</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.Item icon={<PersonWorkspace/>}>Manager Section</Menu.Item>
                        <Menu.SubMenu icon={<ListColumns/>} title='Survey'>
                            <Menu.Item>Create New Survey</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu title='R&R Section' icon={<Award/>}>
                            <Menu.Item 
                                onClick={ () => navigateToExternal('https://r-sammaan.ril.com/Pages/r-sammaan.aspx')}>R-Samman Portal</Menu.Item>
                            <Menu.Item disabled={true}>Leaders Appreciation Center</Menu.Item>
                            <Menu.Item>R&R placeholder</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.Item icon={<People/>}>Employee Engagement Center</Menu.Item>

                        <Menu.SubMenu icon={<Download/>} title = 'Download Center'>
                            <Menu.Item
                                key='new-employee-downloads'
                                onClick={()=>navigateTo('/download-center/new-employees/')}>
                                New Employee Downloads
                            </Menu.Item>
                            <Menu.Item
                                key='templates'
                                onClick={()=>navigateTo('')}>
                                Templates
                            </Menu.Item>
                            <Menu.Item
                                key='leaders-gallery'
                                onClick={()=>navigateTo('/download-center/leaders-gallery/')}>
                                Leaders' Gallery
                            </Menu.Item>
                            <Menu.Item
                                key='logo'
                                onClick={()=>navigateTo('')}>
                                Logo
                            </Menu.Item>
                            <Menu.Item
                                key='policies'
                                onClick={()=>navigateTo('')}>
                                Frequently Used Policies
                            </Menu.Item>
                        </Menu.SubMenu>

                        <Menu.Item icon={<InfoCircle/>}>Information Center</Menu.Item>
                        <Menu.SubMenu title='Admin Control Panel' icon={<Gear/>}>
                            <Menu.Item key='admin-induction' onClick={()=>navigateTo('/admin/induction')}>Induction</Menu.Item>
                            <Menu.Item key='admin-programs' onClick={()=>navigateTo('/admin/programs')}>Programs</Menu.Item>
                            <Menu.Item key='admin-journeys' onClick={()=>navigateTo('/admin/journeys')}>Journeys</Menu.Item>
                            <Menu.Item onClick={()=>navigateTo('/admin/edit-carousel')}>Edit Carousel</Menu.Item>
                            <Menu.Item onClick={()=>navigateTo('/admin/manage-announcement')}>Manage Announcements</Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Sider>
            </div>
        </>
    )
}