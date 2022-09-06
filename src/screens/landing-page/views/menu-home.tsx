import * as React from 'react'
import { Menu } from "antd/lib";
import { getMenuItems, getMenuRouteByKey } from '../../../service/landing-page-service';
import { useNavigate } from 'react-router-dom';
import { SelectInfo } from 'rc-menu/lib/interface';
import { MenuRoute } from '../../../models/menu-route';
import './../index.css'

export default function MenuHome() {
    const navigate = useNavigate()
    const navigateMenuOnSelect = (e: SelectInfo) =>{
        let menuRoute: MenuRoute = getMenuRouteByKey(e.key)
        if(menuRoute.isExternalLink){
            window.open(menuRoute.navigateTo,'_blank')
        }
        else{
            navigate(menuRoute.navigateTo)
        }
    }
    return (
        <>
            <Menu theme='light' mode='inline' items={getMenuItems()} onSelect={e => navigateMenuOnSelect(e)}/>
        </>
    )
}
