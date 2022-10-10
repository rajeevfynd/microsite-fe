import * as React from 'react'
import { Row, Col, Popconfirm, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, FileAddOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import httpInstance from '../../../../../../utility/http-client';
import { CornerIconsProps, QnaType } from '../../../../../../models/faq-qna-details';



const { confirm } = Modal;

export const CornerIcons = (props: CornerIconsProps) => {

    const text = 'Are you sure to delete this QnA?';

    const showDeleteConfirm = (qnaId : string) => {
        confirm({
          title: 'Are you sure to delete this QnA?',
          icon: <ExclamationCircleOutlined />,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            deleteQna(qnaId)
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };


    const deleteQna = (qnaId : String) => {

        const url = "/microsite/faq/delete-qna/"+ qnaId;
        httpInstance.delete(url)
            .then(response => {
                props.onQnaDelete();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleEdit = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, qnaDetails:QnaType) => {
        event.stopPropagation();
        props.showEditModal(props);
        props.onEditQna(qnaDetails);
        console.log(qnaDetails)
    }

    const handleDelete = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, qnaId:Number) => {
        event.stopPropagation();
        showDeleteConfirm(event.currentTarget.id);
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
                            onClick={event => handleDelete(event, props.qnaDetails.id)}
                        />
                </Col>
            </Row>


        </>
    )

}
function onQnaUpdate() {
    throw new Error('Function not implemented.');
}

