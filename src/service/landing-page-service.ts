import { menuItems, menuRoutes } from "../constants/menu-constants";
import { siteTitle, siteFooter } from "../constants/string-constants";
import { SelectInfo } from "rc-menu/lib/interface";
import { MenuRoute } from "../models/menu-route";
import { MenuProps } from "antd";

export function getMenuItems(): MenuProps['items'] {
    return menuItems
}
export function getSiteTitle(): string{
    return siteTitle
}
export function getSiteFooter(): string{
    return siteFooter
}
export function getMenuRoutes(): MenuRoute[] {
    return menuRoutes
}
export function getMenuRoute(key:string): MenuRoute {
    return getMenuRoutes().find( (menuRoute: MenuRoute) => menuRoute.key==key )
}