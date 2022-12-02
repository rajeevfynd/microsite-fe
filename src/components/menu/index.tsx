import * as React from 'react';
import './index.css';
import { MenuItem } from './item';

type MenuItemProp = {
    key?: string,
    title: string,
    icon?: string
}

export interface SecondaryMenuItem extends MenuItemProp {

}

export interface PrimaryMenuItem extends MenuItemProp {
    secondaryItems?: SecondaryMenuItem[] | null
}

export type TopNavigationMenuProps = {
    menu: PrimaryMenuItem[] | null
}

export const TopNavigationMenu = (props: TopNavigationMenuProps) => {

    return (
        <>
            <div className='menu-container'>
                {props.menu.map(item => <MenuItem title={item.title} selected />)}
            </div>
        </>
    )
}