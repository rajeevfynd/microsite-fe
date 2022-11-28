import * as React from "react";
import { Divider, Typography, Button, Modal } from "antd";
import { ChampsList } from "./champs-list";
import { ChampsPopup } from "./champs-popup";



export const TopChamps = (props: {
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
            <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
                <Typography.Text disabled style={{ fontSize: "12px", width: '50%' }}>Top Champs</Typography.Text>
                <div style={{ width: '100%' }} >
                    <Divider />
                </div>
            </div>

            <ChampsList data={data.slice(0, 2)} />

            <div style={{ display: 'flex', flexDirection: "row", padding: "5px" }}>
                <Button style={{ width: '100%', textAlign: "center", borderRadius: "10px" }} onClick={() => handleSeeAllClick()}>
                    <Typography.Text disabled style={{ fontSize: "12px", width: '50%' }}>
                        {"See All"}
                    </Typography.Text>
                </Button>
            </div >

            <Modal
                title="Top Champs"
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