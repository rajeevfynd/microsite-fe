import { Avatar, Card, Col, message, Modal, Row, SelectProps, Space } from 'antd'
import * as React from 'react'
import {DeleteTwoTone, DownloadOutlined, ExclamationCircleFilled} from '@ant-design/icons';
import { Content } from 'antd/lib/layout/layout';
import { DELETE_DOWNLOAD_CENTER_DOCUMENT, GET_DOWNLOAD_CATEGORIES_URL, GET_LEADERS_GALLERY_URL } from '../../../../constants/urls';
import { AddDocumentPropsType, DownloadDocumentType } from '../../../../models/download-center-type';
import httpInstance from '../../../../utility/http-client';
import { EditDownloadDocument } from './edit-document';
import { AddDownloadDocument } from './add-document';

export const AdminLeadersGallery = () => {
    
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
        getLeadersList()
    }

    const handleDeleteDocument = (id : number) => {
        httpInstance.put(DELETE_DOWNLOAD_CENTER_DOCUMENT + id, {})
            .then(response => {
                getLeadersList()
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

    const getLeadersList = () => {
        const url = GET_LEADERS_GALLERY_URL
        httpInstance.get(url)
            .then(response => {
                setLeadersList(response.data.downloadDocumentsList)
                console.log(response.data.downloadDocumentsList)
            })
            .catch((error) => {
                message.error(error);
            });
        }

        const addDocumentProps : AddDocumentPropsType = {
            departmentOptionsList: [],
            downloadCategoryList : downloadCategoryList,
            onFinish : handleSubmit,
        }

        const getDownloadsCategoryList = () => {
            httpInstance.get(GET_DOWNLOAD_CATEGORIES_URL)
                .then(response => {
                    console.log(response.data)
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
        getLeadersList();
        getDownloadsCategoryList();
    }, [])


    return (
        <>
        <style>
            {css}
        </style>
        <Row>
            <h3>Leaders' Gallery</h3>
        </Row>
        <Row>
            <Col span={24} style={{display: 'flex', justifyContent: 'flex-end'}}>
                <AddDownloadDocument {...addDocumentProps}></AddDownloadDocument>
            </Col>
        </Row>
        <Row>
            <Content className='leaders-gallery'>
                <Row>
                    
                    {leadersList != undefined && leadersList.map((leader) => (
                        <Col xs={24} xl={8} sm={24} md={12} lg={12}>
                        <Card
                            style={{ width: 300 }}
                            hoverable
                            cover={
                                
                                <img 
                                onClick={() => handleImgClick(leader.documentId)} 
                                src={`data:image/png;base64,${leader.docThumbnail}`}/>
                            }
                            actions={[
                                <>
                                    <Space size={20}>

                                        <DownloadOutlined onClick={() => handleImgClick(leader.documentId)}></DownloadOutlined>

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
