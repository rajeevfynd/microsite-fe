import * as React from 'react';

import { Menu, } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';


export function SkillList(props: { items: ItemType[]; }) {
    return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={props.items} />
    );
}
