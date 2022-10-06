import * as React from 'react'
import { Modal } from 'antd';
import { QnaForm } from './qna-form';
import { QnaType } from '../../../../../../models/faq-qna-details';



export const QnaPopup = (props: { isModalOpen: boolean; handleCancel: any; editQnaDetails:QnaType, activeCategoryName:string}) => {
    const { isModalOpen, handleCancel } = props;


    return (
        <Modal
            destroyOnClose={true}
            visible={isModalOpen}
            title="Edit the question or answer"
            footer={null}
            onCancel={handleCancel}
        >

            <QnaForm editQnaDetails={props.editQnaDetails} activeCategoryName={props.activeCategoryName}/>

        </Modal>

    )
}
