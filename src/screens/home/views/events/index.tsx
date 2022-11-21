import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import * as React from 'react';

export const Events = () => {
    return (
        <>
            <Card className="home-card">
                <Meta title={
                    <div style={{ display: "flex" }}>
                        <h4>Events</h4>
                        
                    </div>}
                />

            </Card>
        </>
    )
}