import * as React from 'react';
import "./index.css";

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
    selected?: boolean | false
    disabled?: boolean | false
    access?: boolean | false
}

function behaviour({ selected, disabled }: MenuItemProps): string {
    if (disabled) {
        // adds disabled class to the menu
        return 'disabled';
    }

    if (selected) {
        // adds selected class to the menu
        return 'selected';
    }
    return "";
}

export const MenuItem = (props: MenuItemProps) => {
    return (
        <a className={`primary-menu-item ${behaviour(props)}`} onClick={() => props.onClick()}>
            {props.icon}
            <p className='text'>{props.title}</p>
        </a>
    )
}

export const SecondaryMenuItem = (props: MenuItemProps) => {
    return (

        <a className={`secondary-menu-item ${behaviour(props)}`} onClick={() => props.onClick()}>
            {props.icon}
            <p>{props.title}</p>
        </a>
    )
}