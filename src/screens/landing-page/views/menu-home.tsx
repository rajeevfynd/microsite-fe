import * as React from 'react'
import { Button, Menu } from "antd/lib";
import { getMenuItems, getMenuRouteByKey, addIconMapItem, getMenuRouteKeyByPath } from '../../../service/landing-page-service';
import { useLocation, useNavigate } from 'react-router-dom';
import { SelectInfo } from 'rc-menu/lib/interface';
import { MenuRoute } from '../../../models/menu-route';
import './../index.css'
import { Award, BookHalf, PersonWorkspace, People, Download, InfoCircle } from "react-bootstrap-icons";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import Sider from 'antd/lib/layout/Sider';

export default function MenuHome() {
    const navigate = useNavigate()
    const location = useLocation()

    addIconMapItem('learning-and-development',<BookHalf></BookHalf>)
    addIconMapItem('rnr-section',<Award></Award>)
    addIconMapItem('manager-section', <PersonWorkspace></PersonWorkspace>)
    addIconMapItem('employee-engagement-center', <People></People>)
    addIconMapItem('download-center', <Download></Download>)
    addIconMapItem('information-center', <InfoCircle></InfoCircle>)

    const [collapsed, setCollapsed] = React.useState(true)

    const navigateMenuOnSelect = (e: SelectInfo) =>{
        let menuRoute: MenuRoute = getMenuRouteByKey(e.key)
        if(menuRoute.isExternalLink){
            window.open(menuRoute.navigateTo,'_blank')
        }
        else{
            navigate(menuRoute.navigateTo)
        }
        setCollapsed(true)
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
            <Sider  theme='light' collapsed={collapsed} width={350} collapsedWidth={0}>
                <Menu 
                    theme='light' 
                    mode='inline' 
                    items={getMenuItems()} 
                    defaultSelectedKeys={[getMenuRouteKeyByPath(location.pathname)]} 
                    onSelect={e => navigateMenuOnSelect(e)}
                />
            </Sider>
            </div>
        </>
    )
}
