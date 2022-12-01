import { Card, Input } from 'antd';
import * as React from 'react';



export const ShadowSearchInput = (props: any) => {
    return (
        <>
            <div style={{ width: props.width || "50%", marginTop: "30px", marginBottom: "30px" }}>
                <Card className='home-card search-card' bodyStyle={{ padding: "12px" }}>
                    <Input {...props} bordered={false} allowClear onChange={(e) => props.onChange(e.target.value)} />
                </Card>
            </div>
        </>
    )
} 