import { Card, Col, message, Modal, Row, SelectProps, Space } from 'antd'
import * as React from 'react'
import {DownloadOutlined} from '@ant-design/icons';
import { Content } from 'antd/lib/layout/layout';
import { DownloadListPropsType, DownloadDocumentType } from '../../../models/download-center-type';
import { getDownloadsList } from '../../../service/download-center-service';
import httpInstance from '../../../utility/http-client';
import { formatBase64 } from '../../../utility/image-utils';

export const DownloadsGallery = (props:{downloadListProps: DownloadListPropsType}) => {
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


      const getDownloadsGallery = () => {
        getDownloadsList(downloadListProps.categoryId)
            .then(response => {
                setLeadersList(response.data.content)
                console.log(response.data)
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
        <Row>
            <h3>{props.downloadListProps.title}</h3>
        </Row>

        <Row>
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
