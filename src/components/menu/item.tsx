import * as React from 'react';
import "./index.css";

<<<<<<< HEAD
export type MenuItemProps = {
    title: string,
    key?: string,
=======
export declare type MenuClickEventHandler = () => void;


type MenuItemInfo = {
    key?: string,
    title: string,
    icon?: React.ReactNode;
    src?: string,
    navigate?: string
}

export interface MenuItemProps extends MenuItemInfo {
    onClick?: MenuClickEventHandler
>>>>>>> 1f86a85 (Top menu impl)
    selected?: boolean | false
}

export const MenuItem = (props: MenuItemProps) => {
    return (
<<<<<<< HEAD
        <h6 className={`menu-text${props.selected ? ' selected' : ""}`}>{props.title}</h6>
=======
        <a className={`primary-menu-item${props.selected ? ' selected' : ""}`} onClick={() => props.onClick()}>
            {props.icon}
            <p className='text'>{props.title}</p>
        </a>
    )
}

export const SecondaryMenuItem = (props: MenuItemProps) => {
    return (

        <a className={`secondary-menu-item${props.selected ? ' selected' : ""}`} onClick={() => props.onClick()}>
            {props.icon}
            <p>{props.title}</p>
        </a>
>>>>>>> 1f86a85 (Top menu impl)
    )
}