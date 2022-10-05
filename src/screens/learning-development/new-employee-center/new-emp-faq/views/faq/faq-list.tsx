import * as React from 'react'
import { Row, Collapse } from 'antd';
import { CornerIcons } from './corner-icons';
import { QnaPopup } from './qna-popup';
import * as moment from 'moment';
import httpInstance from '../../../../../../utility/http-client';


const { Panel } = Collapse;


export const FaqList = (props : any) => {

    const [qnaList, setQnaList] = React.useState([]);
    const [activeKey, setActiveKey] = React.useState([]);
    const [defaultActiveKey, setDefaultActiveKey] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    


    const handlePanelChange = (key: any) => {
        setActiveKey(key);
    };


    const showEditModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleQnaUpdate = () => {
        console.log("handleQnaUpdate " + props.activeId)
        getQnaList()
    }


    const getQnaList = () => {

        const url = "/microsite/faq/category/" + props.activeId;
        httpInstance.get(url)
            .then(response => {
                setQnaList(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    React.useEffect(() => {
        getQnaList();
    }, [props.activeId])


    return (
        <>
            <Collapse defaultActiveKey={[1, 2, 3]} activeKey={activeKey} onChange={handlePanelChange}>
                {qnaList.map((qnaList) => (
                    <Panel header={qnaList.faq.question} key={qnaList.faq.id} 
                        extra={<CornerIcons showEditModal={showEditModal} qnaId={qnaList.faq.id} onQnaUpdate={handleQnaUpdate}/>}>
                        <div>
                            <Row>
                                {qnaList.faq.answer}
                            </Row>
                            <p></p>
                            <Row justify="end">
                                <div>Updated {moment(qnaList.faq.updated_at).fromNow()}</div>
                            </Row>
                        </div>
                    </Panel>

                ))}
            </Collapse>

            <QnaPopup isModalOpen={isModalOpen} handleCancel={handleCancel} />
        </>

    )
}
