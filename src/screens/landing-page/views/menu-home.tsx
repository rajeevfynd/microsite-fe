import * as React from 'react'
import { Button, Menu } from "antd/lib";
import { getMenuRouteKeyByPath } from '../../../service/landing-page-service';
import { useLocation, useNavigate } from 'react-router-dom';
import './../index.css'
import { Award, BookHalf, PersonWorkspace, People, Download, InfoCircle, ListColumns } from "react-bootstrap-icons";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import Sider from 'antd/lib/layout/Sider';

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
                                    onClick={()=>navigateTo('/lnd/learning-center/skill')}>
                                        Skill</Menu.Item>
                                        <Menu.Item
                                    key='addSkill'
                                    onClick={()=>navigateTo('/lnd/learning-center/addSkill')}>
                                        Add Skill</Menu.Item>
                                        <Menu.Item
                                    key='addCourse'
                                    onClick={()=>navigateTo('/lnd/learning-center/addCourse')}>
                                      Add Course</Menu.Item>
                                <Menu.Item
                                    key='role'
                                    onClick={()=>navigateTo('/lnd/learning-center/role')}>
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
                        <Menu.Item icon={<Download/>}>Download Center</Menu.Item>
                        <Menu.Item icon={<InfoCircle/>}>Information Center</Menu.Item>
                    </Menu>
                </Sider>
            </div>
        </>
    )
}