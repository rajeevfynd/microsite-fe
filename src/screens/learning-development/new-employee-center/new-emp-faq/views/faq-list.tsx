import * as React from 'react'
import { Row, Collapse, Pagination, PaginationProps, message, Col, Result, Typography , } from 'antd';
import { CornerIcons } from './corner-icons';
import { QnaPopup } from './qna-popup';
import * as moment from 'moment';
import httpInstance from '../../../../../utility/http-client';
import { FaqListPropsType, QnaPopupPropsType, QnaType } from '../../../../../models/faq-qna-details';
import { EditQnaOption } from '../../../../../models/enums/qna-edit-options';
import { FAQ_LIST_OFFSET, FAQ_LIST_PAGESIZE } from '../../../../../constants/string-constants';
import { FAQ_LIST_URL } from '../../../../../constants/urls';
import { getUser } from '../../../../../utility/user-utils';
import { Content } from 'antd/lib/layout/layout';


const { Panel } = Collapse;
const { Text } = Typography;

export const FaqList = (props : {faqProps : FaqListPropsType}) => {
    const {faqProps} = props;

    const user:any = getUser()
    const [userRole, setUserRole] = React.useState('');

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
    

    const handleImgClick = async (documentId : number)  => {
        let url : string = ""
        let docUrl = await httpInstance.get("/microsite/document/download/" + documentId)
        window.open(docUrl.data.url, '_blank').focus();
    }

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
        if(faqProps.activeCategory != null){
        const url = FAQ_LIST_URL + faqProps.activeCategory + FAQ_LIST_OFFSET + currentOffset + FAQ_LIST_PAGESIZE;
        httpInstance.get(url)
            .then(response => {
                setQnaList(response.data.content)
                setTotalElements(response.data.totalElements)
                console.log(response.data.content)
            })
            .catch((error) => {
                message.error(error);
            });
        } 
    }

    React.useEffect(() => {
        getQnaList();
    }, [faqProps.activeCategory, faqProps.newQnaAdded, currentOffset])

    React.useEffect( ()=> {
        if(user){
            setUserRole(user.role)
        }
    })

    return (
        <>  

            {
                (!faqProps.activeCategory || qnaList.length == 0) &&

                <Result
                    status="404"
                    title={<Text type='secondary'>No FAQs Found</Text>}
                />

            }

            {qnaList.length > 0 && 
            
                <>
                    
                    <Row justify="end" style={{ margin: 20 }}>
                        <Pagination size="small" current={currentPage} onChange={handlePageChange} total={totalElements} />
                    </Row>

                
                    <Collapse activeKey={activeKey} onChange={handlePanelChange}>
                        {qnaList.map((qnaList) => (

                            <Panel header={qnaList.faq.question} key={qnaList.faq.id}
                                extra={userRole == "ADMIN" && <CornerIcons
                                    qnaId={qnaList.faq.id}
                                    qnaDetails={qnaList.faq}
                                    onQnaDelete={handleQnaDelete}
                                    onEditQna={handleEditQna} />}
                            >
                                <div>
                                    <Row>
                                        {qnaList.faq.answer}
                                    </Row>
                                    <Row>
                                        {qnaList.faq.attachmentDetails.map((attachment: any) => (
                                            <Col xs={24} xl={6} style={{ padding: 20 }}>
                                                <img width='200' height='200'
                                                    onClick={() => handleImgClick(attachment.documentId)}
                                                    src={`data:image/png;base64,${attachment.thumbnailUrl}`} />
                                            </Col>
                                        ))}
                                    </Row>

                                    <Row justify="end">
                                        <div><small><i className='text-muted'>Updated {moment(qnaList.faq.updatedAt).fromNow()}</i></small></div>
                                    </Row>
                                </div>
                            </Panel>

                        ))}
                    </Collapse>
                    
                    <QnaPopup qnaProps={qnaProps} />
                        
                </>
            
            } 

            
        </>

    )
}
