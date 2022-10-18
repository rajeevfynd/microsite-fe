import * as React from 'react'
import { Row, Col, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { CornerIconsProps, QnaType } from '../../../../../models/faq-qna-details';



export const CornerIcons = (props: CornerIconsProps) => {

    const handleEdit = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, qnaDetails:QnaType) => {
        event.stopPropagation();
        props.onEditQna(qnaDetails);
    }

    const handleDelete = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, qnaDetails:QnaType) => {
        event.stopPropagation();
        props.onQnaDelete(qnaDetails);
    }

    return (
        <>  
            <Row style={{ gap: 20 }}>
                <Col>
                    <EditOutlined
                        onClick={event => handleEdit(event, props.qnaDetails)}
                    />
                </Col>
                <Col>
                    <DeleteOutlined id={props.qnaId}
                        onClick={event => handleDelete(event, props.qnaDetails)}
                    />
                </Col>
            </Row>
        </>
    )
}