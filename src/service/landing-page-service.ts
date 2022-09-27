import * as React from "react";
import { menuItems, menuRoutes } from "../constants/landing-page-menu-items";
import { SITE_TITLE, SITE_FOOTER, DEFAUL_PRO_PIC_URL } from "../constants/string-constants";
import { MenuRoute } from "../models/menu-route";

// maps icons to menu items
export function addIconMapItem(key:string,icon:object){
    let item = getMenuItems().find((item:any)=>item.key==key)
    item.icon = icon;
}// accepts the 2 paths and returns true if both belong to same route
function matchRoutes(path1:string, path2:string){
    return path2.match(path1) != null
}
// returns key of menu route for specific path
export function getMenuRouteKeyByPath(path: string) : Array<string> {
    let route = getMenuRoutes().find( (route: MenuRoute) => matchRoutes(route.navigateTo,path) )
    let defaultKeys = []
    if(route != undefined){
        defaultKeys.push(route.key)
    }
    else{
        defaultKeys.push('')
    }
    return defaultKeys
}

// returns menu items after authorization check
export function getMenuItems():any[] {
    return menuItems
}

// returns site title
export function getSiteTitle(): string{
    return SITE_TITLE
}

// returns site footer
export function getSiteFooter(): string{
    return SITE_FOOTER
}

//
export function getDefaulProPicUrl(): string{
    return DEFAUL_PRO_PIC_URL
}

// returns menu routes
export function getMenuRoutes(): MenuRoute[] {
    return menuRoutes
}

// returns menu route by key
export function getMenuRouteByKey(key:string): MenuRoute {
    return getMenuRoutes().find( (menuRoute: MenuRoute) => menuRoute.key==key )
}