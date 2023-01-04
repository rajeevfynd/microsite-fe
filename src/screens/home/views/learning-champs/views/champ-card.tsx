import { Card, Avatar } from "antd";
import * as React from "react";



export const ChampCard = (props: { champ: any; }) => {

    const { champ } = props;



    return (
        <>
            <Card hoverable bodyStyle={{ padding: "10px" }} style={{ borderRadius: "10px", width: "100%", }}>
                <div style={{ display: "flex", flexDirection: "row", columnGap: "10px" }}>
                    <div>
                        <Avatar style={{ margin: 'auto', width: '51px', height: '51px' }}
                            src={champ.profilePicture}
                        />
                    </div>

                    <div style={{ width: "100%" }}>
                        <div style={{ display: "flex", flexDirection: "row", }}>
                            <div style={{ width: "100%" }}>
                                {champ.name}
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", }}>
                            <div style={{ width: "100%" }}>
                                {champ.department || "3P Marketplace"}
                            </div>
                        </div>
                    </div>

                    <div style={{ width: "100%" }}>
                        <div style={{ display: "flex", flexDirection: "row", height: '51px', width: "100%" }}>
                            <div style={{ margin: "auto" }}>
                                {champ.count}
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}