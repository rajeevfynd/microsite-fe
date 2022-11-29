import * as React from "react";
import { Modal } from "antd";
import { ChampsList } from "./champs-list";
import { ChampsPopup } from "./champs-popup";
import { ChampsTitle } from "./champ-title";
import { SeeAllButton } from "./see-all-button";
import { Champs } from "../constant";



export const WeeklyChamps = (props: {
    data: { id: number, profilePicture: string, name: string, department: string, score: number }[];
}) => {

    const { data } = props;


    const [isModalOpen, setIsModalOpen] = React.useState(false);


    const showModal = () => {
        setIsModalOpen(true);
    };

    const closeModel = () => {
        setIsModalOpen(false);
    };

    const handleSeeAllClick = () => {
        showModal();
    }

    return (
        <>
            <ChampsTitle title={Champs.weeklyChamps} />

            <ChampsList data={data.slice(0, 3)} />

            <SeeAllButton handleSeeAllClick={handleSeeAllClick} />

            <Modal
                title={Champs.weeklyChamps}
                visible={isModalOpen}
                footer={null}
                onCancel={closeModel}
                width={500}
            >
                <ChampsPopup data={data} />
            </Modal>
        </>
    )
}