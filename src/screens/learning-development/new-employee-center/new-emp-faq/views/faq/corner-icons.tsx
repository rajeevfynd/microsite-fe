import * as React from 'react'
import { Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


export function CornerIcons(props: { showModal: any; }) {

    const { showModal } = props;

    const handleEdit = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event.stopPropagation();
        showModal();
    }

    const handleDelete = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event.stopPropagation();
    }

    return (
        <>
            <Row style={{ gap: 20 }}>
                <Col>
                    <EditOutlined
                        onClick={event => handleEdit(event)}
                    />
                </Col>
                <Col>
                    <DeleteOutlined
                        onClick={event => handleDelete(event)}
                    />
                </Col>
            </Row>


        </>
    )

}
