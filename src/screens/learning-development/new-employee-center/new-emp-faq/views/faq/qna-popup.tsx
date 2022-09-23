import * as React from 'react'
import { Modal } from 'antd';
import { QnaForm } from './qna-form';



export const QnaPopup = (props: { isModalOpen: boolean; handleCancel: any; }) => {
    const { isModalOpen, handleCancel } = props;


    return (
        <Modal
            destroyOnClose={true}
            visible={isModalOpen}
            title="Edit the question or answer"
            footer={null}
            onCancel={handleCancel}
        >

            <QnaForm />

        </Modal>

    )
}
