import * as React from "react";
import { ChampsList } from "./champs-list";



export const ChampsPopup = (props: { data: any; }) => {

    const { data } = props;


    return (
        <div id="champs-list" style={{ overflow: "auto", height: "50%" }}>
            <ChampsList data={data} />
        </div>
    )
}