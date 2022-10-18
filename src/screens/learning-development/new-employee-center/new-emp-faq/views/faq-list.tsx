import * as React from 'react'
import { Row, Collapse, Pagination, PaginationProps , } from 'antd';
import { CornerIcons } from './corner-icons';
import { QnaPopup } from './qna-popup';
import * as moment from 'moment';
import httpInstance from '../../../../../utility/http-client';
import { FaqListPropsType, QnaPopupPropsType, QnaType } from '../../../../../models/faq-qna-details';
import { EditQnaOption } from '../../../../../models/enums/qna-edit-options';


const { Panel } = Collapse;

export const FaqList = (props : {faqProps : FaqListPropsType}) => {
    const {faqProps} = props;

    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalElements, setTotalElements] = React.useState();
    const [currentOffset, setCurrentOffset] = React.useState(0);
    const [qnaList, setQnaList] = React.useState([]);
    const [activeKey, setActiveKey] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [qnaDetails, setQnaDetails] = React.useState(null);
    const [modalTitle, setModalTitle] = React.useState("")
    const [editQnaOption, setEditOption] = React.useState(null);
    

    const editTitle = "Edit the question or answer"
    const deleteTitle = "Are you sure to delete this QnA?"

    const handlePanelChange = (key: any) => {
        setActiveKey(key);
    };

    const handleQnaEditDeleteOk = () => {
        setIsModalOpen(false);
        getQnaList()
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleQnaDelete = (qnaDetails:QnaType) => {
        setQnaDetails(qnaDetails)
        setIsModalOpen(true)
        setModalTitle(deleteTitle)
        setEditOption(EditQnaOption.DELETE)
    }

    const handleEditQna = (qnaDetails:QnaType) => {
        setQnaDetails(qnaDetails)
        setModalTitle(editTitle)
        setIsModalOpen(true)
        setEditOption(EditQnaOption.EDIT)
    }

    const handlePageChange: PaginationProps['onChange'] = page => {
        setCurrentPage(page);
        setCurrentOffset(page - 1);
    };

    const qnaProps : QnaPopupPropsType = {
        isModalOpen: isModalOpen,
        handleCancel:handleCancel,
        editQnaDetails:qnaDetails,
        onQnaEditDeleteOk:handleQnaEditDeleteOk,
        categoryList: faqProps.faqCategoryList,
        modalTitle: modalTitle,
        editQnaOption : editQnaOption
    }


    const getQnaList = () => {

        const url = "/microsite/faq/category/" + faqProps.activeCategory + "?offset=" + currentOffset + "&pageSize=10";
        httpInstance.get(url)
            .then(response => {
                setQnaList(response.data.content)
                setTotalElements(response.data.totalElements)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    React.useEffect(() => {
        getQnaList();
    }, [faqProps.activeCategory, faqProps.newQnaAdded, currentOffset])

    return (
        <>  

            <Row justify="end" style={{margin:20}}>
                <Pagination size="small" current={currentPage} onChange={handlePageChange} total={totalElements} />
            </Row>
            <Collapse activeKey={activeKey} onChange={handlePanelChange}>
                {qnaList.map((qnaList) => (
                    <Panel header={qnaList.faq.question} key={qnaList.faq.id} 
                        extra={<CornerIcons
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
        </>

    )
}
