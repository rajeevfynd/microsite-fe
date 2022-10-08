import { Button, Modal, Collapse } from 'antd';
import * as React from 'react';
import { useState } from 'react';
import Slide from './edit-slide-form';

const { Panel } = Collapse;

const ModalCarousal = () => {
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = (e: any) => {
        console.log(e);
        setOpen(false);
    };

    const handleCancel = (e: any) => {
        console.log(e);
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Edit Carousal
            </Button>
            <Modal
                title="Edit Carousal"
                visible={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="submit" type="primary" onClick={handleOk}>
                        OK
                    </Button>,
                ]}
            >
                <Collapse accordion>
                    <Panel header="Slide 1" key="1">
                        <Slide/>
                    </Panel>
                    <Panel header="Slide 2" key="2">
                        <Slide/>
                    </Panel>
                    <Panel header="Slide 3" key="3">
                        <Slide/>
                    </Panel>
                </Collapse>

            </Modal>
            <br></br>
        </>
    );
};

export default ModalCarousal;