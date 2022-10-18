import * as React from 'react'
import { Modal } from 'antd';
import { QnaForm } from './qna-form';
import { QnaFormPropsType, QnaPopupPropsType, DeleteFormPropsType } from '../../../../../models/faq-qna-details';
import { EditQnaOption } from '../../../../../models/enums/qna-edit-options';
import { DeleteQnaForm } from './delete-qna-form';



    export const QnaPopup = (props:{qnaProps: QnaPopupPropsType}) => {
    const { qnaProps} = props;
    const [currentActiveCategory, setcurrentActiveCategory] = React.useState(null);

    
    const handleQnaEditDeleteOk = () => {
        qnaProps.onQnaEditDeleteOk()
    } 

    React.useEffect(() => {
        setcurrentActiveCategory(qnaProps.currentActiveCategory)
    }, [qnaProps.currentActiveCategory])

    const qnaFormProps : QnaFormPropsType = {
        editQnaDetails:qnaProps.editQnaDetails,
        categoryList:qnaProps.categoryList,
        currentActiveCategory: currentActiveCategory,
        onQnaEditOk : handleQnaEditDeleteOk,
    }

    const deleteFormProps : DeleteFormPropsType = {
        editQnaDetails:qnaProps.editQnaDetails,
        onQnaDeleteOk : handleQnaEditDeleteOk
    }


    return (
        <Modal
            destroyOnClose={true}
            visible={qnaProps.isModalOpen}
            title={qnaProps.modalTitle}
            footer={null}
            onCancel={qnaProps.handleCancel}
        >
            {qnaProps.editQnaOption == EditQnaOption.EDIT? <QnaForm qnaFormProps={qnaFormProps}/> : 
                <DeleteQnaForm deleteQnaFormProps={deleteFormProps}/>
            }

        </Modal>

    )
}
