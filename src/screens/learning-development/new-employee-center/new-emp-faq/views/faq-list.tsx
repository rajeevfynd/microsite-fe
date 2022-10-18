import * as React from 'react'
import { Row, Collapse , } from 'antd';
import { CornerIcons } from './corner-icons';
import { QnaPopup } from './qna-popup';
import * as moment from 'moment';
import httpInstance from '../../../../../utility/http-client';
import { DeleteQnaModalPropsType, FaqListPropsType, QnaModalPropsType, QnaType } from '../../../../../models/faq-qna-details';
import { DeletePopup } from './delete-qna-form';


const { Panel } = Collapse;

export const FaqList = (props : {faqProps : FaqListPropsType}) => {
    const {faqProps} = props;

    const [qnaList, setQnaList] = React.useState([]);
    const [activeKey, setActiveKey] = React.useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const [editQnaDetails, setEditQnaDetails] = React.useState(null);
    const [currentActiveCategory, setcurrentActiveCategory] = React.useState(null);
    const [modalTitle, setModalTitle] = React.useState("")

    const editTitle = "Edit the question or answer"
    const deleteTitle = "Are you sure you want to delete this question?"

    const handlePanelChange = (key: any) => {
        setActiveKey(key);
    };

    const showEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleQnaEditOk = () => {
        setIsEditModalOpen(false);
        getQnaList()
        console.log('handleQnaEditOk')
    };

    const handleCancel = () => {
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false)
    };

    const handleQnaDelete = (qnaDetails:QnaType) => {
        console.log("delete clicked")
        setEditQnaDetails(qnaDetails)
        setIsDeleteModalOpen(true)
        setModalTitle(deleteTitle)
    }

    const handleEditQna = (qnaDetails:QnaType) => {
        setEditQnaDetails(qnaDetails)
        setModalTitle(editTitle)
    }

    const handleQnaDeleteOk = (qnaDetails:QnaType) => {
        setIsDeleteModalOpen(false)
        getQnaList()
        console.log('handleQnaDeleteOk')
    }

    const qnaProps: QnaModalPropsType = {
        isEditModalOpen: isEditModalOpen,
        handleCancel:handleCancel,
        editQnaDetails:editQnaDetails,
        categoryList:faqProps.faqCategoryList,
        currentActiveCategory: currentActiveCategory,
        onQnaEditOk : handleQnaEditOk,
    };

    const deleteProps: DeleteQnaModalPropsType = {
        isDeleteModalOpen: isDeleteModalOpen,
        handleCancel:handleCancel,
        editQnaDetails:editQnaDetails,
        onQnaDeleteOk : handleQnaDeleteOk,
    }


    const getQnaList = () => {

        const url = "/microsite/faq/category/" + faqProps.activeCategory;
        httpInstance.get(url)
            .then(response => {
                setQnaList(response.data)
                 console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    React.useEffect(() => {
        getQnaList();
    }, [faqProps.activeCategory])

    React.useEffect(() => {
        setcurrentActiveCategory(faqProps.activeCategory)
    }, [faqProps.activeCategory])

    React.useEffect(() => {
        getQnaList();
    }, [faqProps.newQnaAdded])

    return (
        <>
            <Collapse activeKey={activeKey} onChange={handlePanelChange}>
                {qnaList.map((qnaList) => (
                    <Panel header={qnaList.faq.question} key={qnaList.faq.id} 
                        extra={<CornerIcons 
                                showEditModal={showEditModal} 
                                qnaId={qnaList.faq.id}
                                qnaDetails={qnaList.faq}
                                onQnaDelete={handleQnaDelete}
                                onEditQna={handleEditQna}
                                />}>
                        <div>
                            <Row>
                                {qnaList.faq.answer}
                            </Row>
                            <p></p>
                            <Row justify="end">
                                <div><small><i className='text-muted'>Updated {moment(qnaList.faq.updatedAt).fromNow()}</i></small></div>
                            </Row>
                        </div>
                    </Panel>

                ))}
            </Collapse>

            <QnaPopup qnaProps={qnaProps}/>

            <DeletePopup deleteProps={deleteProps} />
        </>

    )
}
