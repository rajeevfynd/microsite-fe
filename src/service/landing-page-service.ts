import { menuItems, menuRoutes } from "../constants/landing-page-menu-items";
import { SITE_TITLE, SITE_FOOTER } from "../constants/string-constants";
import { MenuRoute } from "../models/menu-route";
import { MenuProps } from "antd";

// returns menu items after authorization check
export function getMenuItems(): MenuProps['items'] {

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

// returns menu routes
export function getMenuRoutes(): MenuRoute[] {
    return menuRoutes
}

// returns menu route by key
export function getMenuRouteByKey(key:string): MenuRoute {
    return getMenuRoutes().find( (menuRoute: MenuRoute) => menuRoute.key==key )
}