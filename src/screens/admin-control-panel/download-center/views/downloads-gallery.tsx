import { Card, Col, message, Modal, Row, SelectProps, Space } from 'antd'
import * as React from 'react'
import {DeleteTwoTone, DownloadOutlined, ExclamationCircleFilled} from '@ant-design/icons';
import { Content } from 'antd/lib/layout/layout';
import { DELETE_DOWNLOAD_CENTER_DOCUMENT, GET_DOWNLOAD_CATEGORIES_URL } from '../../../../constants/urls';
import { AddDocumentPropsType, DownloadDocumentType, DownloadListPropsType } from '../../../../models/download-center-type';
import httpInstance from '../../../../utility/http-client';
import { EditDownloadDocument } from './edit-document';
import { AddDownloadDocument } from './add-document';
import { getDownloadsList } from '../../../../service/download-center-service';
import { formatBase64 } from '../../../../utility/image-utils';

export const AdminDownloadsGallery = (props:{downloadListProps: DownloadListPropsType}) => {
    const { downloadListProps} = props;
    const { Meta } = Card;

    const { confirm } = Modal;

    const [leadersList, setLeadersList] = React.useState<DownloadDocumentType[]>()
    const [downloadCategoryList, setDownloadCategoryList] = React.useState<SelectProps['options']>([])

    const handleImgClick = async (documentId : number) => {
        let docUrl = await httpInstance.get("/microsite/document/download/" + documentId)
        window.open(docUrl.data.url, '_blank').focus();
    }

    const css = `
    .leaders-gallery {
        margin-top : 50px
    }
        `

    const handleSubmit = () => {
        getDownloadsGallery()
    }

    const handleDeleteDocument = (id : number) => {
        httpInstance.put(DELETE_DOWNLOAD_CENTER_DOCUMENT + id, {})
            .then(response => {
                getDownloadsGallery()
            })
            .catch((error) => {
                message.error(error);
        });
    }

    const showDeleteConfirm = (id : number) => {
        confirm({
          title: 'Are you sure delete this document?',
          icon: <ExclamationCircleFilled />,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            handleDeleteDocument(id)
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };

      const getDownloadsGallery = () => {
        getDownloadsList(downloadListProps.categoryId)
            .then(response => {
                setLeadersList(response.data.content)
            })
            .catch((error) => {
                message.error(error);
            });
    }

        const addDocumentProps : AddDocumentPropsType = {
            departmentOptionsList: [],
            downloadCategoryList : downloadCategoryList,
            downloadCategoryId : downloadListProps.categoryId,
            onFinish : handleSubmit,
        }

        const getDownloadsCategoryList = () => {
            httpInstance.get(GET_DOWNLOAD_CATEGORIES_URL)
                .then(response => {
                    response.data.map((category: any) => downloadCategoryList.push({
                        value: category.id,
                        label: category.category,
                    }))
    
                })
                .catch((error) => {
                    message.error(error);
                });
        }

    React.useEffect(() => {
        getDownloadsGallery();
    }, [])


    return (
        <>
        <style>
            {css}
        </style>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h3>{props.downloadListProps.title}</h3>
            <AddDownloadDocument {...addDocumentProps}></AddDownloadDocument>
        </div>

        <Row className='body-container'>
            <Content className='leaders-gallery'>
                <Row gutter={[{xs : 8, sm : 16, md : 24, lg : 32}, 60]}>
                    
                    {leadersList != undefined && leadersList.map((leader) => (
                        <Col>
                        <Card
                            style={{ width: 300 }}
                            hoverable
                            cover={
                                
                                <img 
                                onClick={() => handleImgClick(leader.document.id)} 
                                src={formatBase64(leader.document.thumbnail)}/>
                            }
                            actions={[
                                <>
                                    <Space size={20}>

                                        <DownloadOutlined onClick={() => handleImgClick(leader.document.id)}></DownloadOutlined>

                                        <EditDownloadDocument
                                            departmentList={[]}
                                            departmentOptionsList={[]}
                                            onFinish={handleSubmit}
                                            documentDetails={leader} 
                                        />
                                        <DeleteTwoTone onClick={() => showDeleteConfirm(leader.id)}/>
                                    </Space>
                                </>
                            ]}
                            >
                            <Meta
                                title= {leader.name}
                                description={leader.description}
                            />
                        </Card>
                    </Col>
                    ))}
                </Row>
            </Content>
        </Row>
        </>
    )

}
