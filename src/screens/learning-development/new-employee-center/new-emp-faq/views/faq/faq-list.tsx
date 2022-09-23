import * as React from 'react'
import { Row, Collapse } from 'antd';
import { CornerIcons } from './corner-icons';
import { QnaPopup } from './qna-popup';


const { Panel } = Collapse;

const JsonData = [
    {
        id: 1,
        question: "Question 1",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, delectus? Id error illo delectus nihil facilis quasi natus voluptatem libero? Alias nam praesentium nihil ipsum perferendis libero hic saepe vel.",
        updated_at: "12 Sep 2022"
    },
    {
        id: 2,
        question: "Question 2",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, delectus? Id error illo delectus nihil facilis quasi natus voluptatem libero? Alias nam praesentium nihil ipsum perferendis libero hic saepe vel.",
        updated_at: "13 Sep 2022"
    },
    {
        id: 3,
        question: "Question 3",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, delectus? Id error illo delectus nihil facilis quasi natus voluptatem libero? Alias nam praesentium nihil ipsum perferendis libero hic saepe vel.",
        updated_at: "14 Sep 2022"
    }
]

export const FaqList = () => {

    const [qnaList, setQnaList] = React.useState([]);
    const [activeKey, setActiveKey] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);



    const handlePanelChange = (key: any) => {
        setActiveKey(key);
    };


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };




    React.useEffect(() => {

        setQnaList(JsonData);

    }, [])


    return (
        <>
            <Collapse defaultActiveKey={[1, 2, 3]} activeKey={activeKey} onChange={handlePanelChange}>
                {qnaList.map((qnaList) => (
                    <Panel header={qnaList.question} key={qnaList.id} extra={<CornerIcons showModal={showModal} />}>
                        <div>
                            <Row>
                                {qnaList.answer}
                            </Row>
                            <p></p>
                            <Row justify="end">
                                Updated at {qnaList.updated_at}
                            </Row>
                        </div>
                    </Panel>

                ))}
            </Collapse>

            <QnaPopup isModalOpen={isModalOpen} handleCancel={handleCancel} />
        </>

    )
}
