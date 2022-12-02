import * as React from 'react';
import "./index.css";

export type MenuItemProps = {
    title: string,
    key?: string,
    selected?: boolean | false
}

export const MenuItem = (props: MenuItemProps) => {
    return (
        <h6 className={`menu-text${props.selected ? ' selected' : ""}`}>{props.title}</h6>
    )
}