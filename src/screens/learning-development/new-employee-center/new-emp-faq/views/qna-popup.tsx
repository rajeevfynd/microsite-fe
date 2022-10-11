import * as React from 'react'
import { Modal } from 'antd';
import { QnaForm } from './qna-form';
import { QnaFormPropsType, QnaModalPropsType } from '../../../../../models/faq-qna-details';



    export const QnaPopup = (props:{qnaProps: QnaModalPropsType}) => {
    const { qnaProps} = props;
    const [currentActiveCategory, setcurrentActiveCategory] = React.useState(null);

    
    const handleQnaEditOk = () => {
        qnaProps.onQnaEditOk()
    } 

    React.useEffect(() => {
        setcurrentActiveCategory(qnaProps.currentActiveCategory)
    }, [qnaProps.currentActiveCategory])

    const qnaFormProps : QnaFormPropsType = {
        editQnaDetails:qnaProps.editQnaDetails,
        categoryList:qnaProps.categoryList,
        currentActiveCategory: currentActiveCategory,
        onQnaEditOk : handleQnaEditOk,
    }

    return (
        <Modal
            destroyOnClose={true}
            visible={qnaProps.isModalOpen}
            title="Edit the question or answer"
            footer={null}
            onCancel={qnaProps.handleCancel}
        >

            <QnaForm qnaFormProps={qnaFormProps}/>

        </Modal>

    )
}
