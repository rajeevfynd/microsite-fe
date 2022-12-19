import { SearchOutlined } from '@ant-design/icons';
import { Card, Input } from 'antd';
import * as React from 'react';



export const ShadowSearchInput = (props: any) => {
    return (
        <>
            <div style={{ width: props.width || "50%", marginTop: "12px", marginBottom: "12px" }}>
                    <Input {...props} className='home-card search-card' style={{padding: '1.1%'}} allowClear onChange={(e) => props.onChange(e.target.value)} suffix={<SearchOutlined/>}/>
            </div>
        </>
    )
} 