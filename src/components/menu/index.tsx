import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';
import { MenuItem, MenuItemProps, SecondaryMenuItem } from './item';

export interface PrimaryMenuItemProps extends MenuItemProps {
    secondaryItems?: SecondaryMenuItemProps[] | null
}

export interface SecondaryMenuItemProps extends MenuItemProps {

}

export type TopNavigationMenuProps = {
    menu: PrimaryMenuItemProps[] | null,
    defaultKey?: string
}

const getSelectedPrimaryItemByKey = (menu: PrimaryMenuItemProps[], key: string) => {
    if (!key) {
        return null;
    }
    for (var item of menu) {
        if (item.key == key) {
            return item;
        }
    }
    return null;
}

const getSelectedByNavigate = (menu: PrimaryMenuItemProps[], path: string, defaultKey: string): string[] => {
    if (!path) {
        return [defaultKey, null];
    }
    for (var item of menu) {
        if (item.navigate === path) {
            return [item.key, null];
        } else if (item.secondaryItems) {
            for (var secondaryItem of item.secondaryItems) {
                if (secondaryItem.navigate === path) {
                    return [item.key, secondaryItem.key];
                }
            }
        }
    }
    return [defaultKey, null];
}

export const TopNavigationMenu = (props: TopNavigationMenuProps) => {

    const navigate = useNavigate();
    const location = useLocation();

    const [secondaryItems, setSecondaryItems] = React.useState<SecondaryMenuItemProps[]>([]);
    const [menuPrimaryKey, setMenuPrimaryKey] = React.useState<string | null>();
    const [menuSecondaryKey, setMenuSecondaryKey] = React.useState<string | null>();

    React.useEffect(() => {
        let selected = getSelectedByNavigate(props.menu, location.pathname, props.defaultKey);
        let item = getSelectedPrimaryItemByKey(props.menu, selected[0]);
        setMenuPrimaryKey(selected[0]);
        setMenuSecondaryKey(selected[1]);
        setSecondaryItems(item?.secondaryItems || []);
    }, []);

    function onPrimaryMenuItemClick(item: PrimaryMenuItemProps) {
        if (item.navigate) {
            setMenuSecondaryKey(null);
        }
        setSecondaryItems(item?.secondaryItems || []);
    }

    function onMenuItemClick(item: MenuItemProps) {
        if (item.disabled) {
            return;
        }
        item.onClick && item.onClick();
        item.navigate && navigate(item.navigate);
    }

    return (
        <>
            <div className='menu-container'>
                {props.menu.map(item => <MenuItem {...item} selected={menuPrimaryKey == item.key} onClick={() => {
                    setMenuPrimaryKey(item.key);
                    onMenuItemClick(item);
                    onPrimaryMenuItemClick(item);
                }} />)}
            </div>
            <div className='secondary-menu'>
                <div className='secondary-menu-container'>
                    {secondaryItems.map(item => <SecondaryMenuItem {...item} selected={menuSecondaryKey == item.key} onClick={() => {
                        setMenuSecondaryKey(item.key);
                        onMenuItemClick(item);
                    }} />)}
                </div>
            </div>
        </>
    )
}