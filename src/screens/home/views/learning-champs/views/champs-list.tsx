import * as React from "react";
import { List } from "antd";
import { ChampCard } from "./champ-card";



export const ChampsList = (props: { data: any; }) => {
    const { data } = props;

    console.log(data);

    return (
        <div>
            <List
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item key={index + 1} style={{ borderBottom: "0px", padding: "5px", }}>
                        <ChampCard champ={item} />
                    </List.Item>
                )
                }
            />
        </div>
    )
}