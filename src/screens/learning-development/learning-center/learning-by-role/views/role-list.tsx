import * as React from 'react';

import { Menu, } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { SelectInfo } from 'rc-menu/lib/interface';


export function RoleList(props: { items: ItemType[]; handleSelectedMenuItem: any; selectedMenuItem: any }) {

    const { items, handleSelectedMenuItem, selectedMenuItem } = props;


    function handleMenuItemSelection(event: SelectInfo) {
        handleSelectedMenuItem(event.selectedKeys);
    }


    return (
        <Menu theme="dark" mode="inline" selectedKeys={selectedMenuItem} items={items} onSelect={(event) => handleMenuItemSelection(event)} />
    );
}


