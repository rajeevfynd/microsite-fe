import * as React from 'react'
import { Typography, Button } from "antd";


export const SeeAllButton = (props: { handleSeeAllClick: Function }) => {
    const { handleSeeAllClick } = props;

    return (<>
        <div style={{ display: 'flex', flexDirection: "row", padding: "5px" }}>
            <Button
                style={{ width: '100%', textAlign: "center", borderRadius: "10px" }}
                onClick={() => handleSeeAllClick()}
            >
                <Typography.Text disabled style={{ fontSize: "12px", width: '50%' }}>
                    {"See All"}
                </Typography.Text>
            </Button>
        </div >
    </>);
}
