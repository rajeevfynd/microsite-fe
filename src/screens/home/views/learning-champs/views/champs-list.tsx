import * as React from "react";
import { List } from "antd";
import { ChampCard } from "./champ-card";



export const ChampsList = (props: {
    data: {
        id: number,
        profilePicture: string,
        name: string,
        department: string,
        score: number
    }[];
}
) => {
    const { data } = props;



    return (
        <div>
            <List
                dataSource={data}
                renderItem={item => (
                    <List.Item key={item.id} style={{ borderBottom: "0px", padding: "5px", }}>
                        <ChampCard champ={item} />
                    </List.Item>
                )
                }
            />
        </div>
    )
}