import * as React from 'react'
import { Row, Collapse , } from 'antd';
import { CornerIcons } from './corner-icons';
import { QnaPopup } from './qna-popup';
import * as moment from 'moment';
import httpInstance from '../../../../../utility/http-client';
import { FaqListPropsType, QnaModalPropsType, QnaType } from '../../../../../models/faq-qna-details';


const { Panel } = Collapse;

export const FaqList = (props : {faqProps : FaqListPropsType}) => {
    const {faqProps} = props;

    const [qnaList, setQnaList] = React.useState([]);
    const [activeKey, setActiveKey] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editQnaDetails, setEditQnaDetails] = React.useState(null);
    const [currentActiveCategory, setcurrentActiveCategory] = React.useState(null);

    const handlePanelChange = (key: any) => {
        setActiveKey(key);
    };

    const showEditModal = () => {
        setIsModalOpen(true);
    };

    const handleQnaEditOk = () => {
        setIsModalOpen(false);
        getQnaList()
        console.log('handleQnaEditOk')
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleQnaDelete = () => {
        getQnaList()
    }

    const handleEditQna = (qnaDetails:QnaType) => {
        setEditQnaDetails(qnaDetails)
    }

    const qnaProps: QnaModalPropsType = {
        isModalOpen: isModalOpen,
        handleCancel:handleCancel,
        editQnaDetails:editQnaDetails,
        categoryList:faqProps.faqCategoryList,
        currentActiveCategory: currentActiveCategory,
        onQnaEditOk : handleQnaEditOk,
    };


    const getQnaList = () => {

        const url = "/microsite/faq/category/" + faqProps.activeCategory;
        httpInstance.get(url)
            .then(response => {
                setQnaList(response.data)
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
        </>

    )
}
