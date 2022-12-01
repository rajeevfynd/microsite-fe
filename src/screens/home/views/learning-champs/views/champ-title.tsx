import { Divider, Typography } from 'antd';
import * as React from 'react';


export const ChampsTitle = (props: { title: string }) => {
    const { title } = props

    return (<>
        <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
            <Typography.Text disabled style={{ fontSize: "12px", width: '50%' }}>
                {title}
            </Typography.Text>
            <div style={{ width: '100%' }} >
                <Divider />
            </div>
        </div>
    </>)
}