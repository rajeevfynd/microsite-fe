import * as React from "react";
import { Modal } from "antd";
import { ChampsList } from "./champs-list";
import { ChampsPopup } from "./champs-popup";
import { ChampsTitle } from "./champ-title";
import { SeeAllButton } from "./see-all-button";
import { Champs } from '../constant';



export const TopChamps = (props: { data: any; }) => {

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
            <ChampsTitle title={Champs.topChamps} />

            <ChampsList data={data.TOP_CHAMP.slice(0, 2)} />

            <SeeAllButton handleSeeAllClick={handleSeeAllClick} />

            <Modal
                title={Champs.topChamps}
                visible={isModalOpen}
                footer={null}
                onCancel={closeModel}
                width={500}
            >
                <ChampsPopup data={data.TOP_CHAMP} />
            </Modal>
        </>
    )
}