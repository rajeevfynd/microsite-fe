import { Avatar, Card, Col, message, Row } from 'antd'
import * as React from 'react'
import {DownloadOutlined} from '@ant-design/icons';
import { Content } from 'antd/lib/layout/layout';
import { DownloadDocumentType } from '../../../models/download-center-type';
import { GET_LEADERS_GALLERY_URL } from '../../../constants/urls';
import httpInstance from '../../../utility/http-client';

export const LeadersGallery = () => {
    
    const { Meta } = Card;

    const [leadersList, setLeadersList] = React.useState<DownloadDocumentType[]>()

    const handleImgClick = async (documentId : number) => {
        let docUrl = await httpInstance.get("/microsite/document/download/" + documentId)
        window.open(docUrl.data.url, '_blank').focus();
    }

    const css = `
    .leaders-gallery {
        margin-top : 50px
    }
        `

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

    React.useEffect(() => {
        getLeadersList();
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
            <Content className='leaders-gallery'>
                <Row>
                    
                    {leadersList != undefined && leadersList.map((leader) => (
                        <Col xs={24} xl={8} sm={24} md={12} lg={12}>
                        <Card
                            style={{ width: 300 }}
                            cover={
                                <img 
                                onClick={() => handleImgClick(leader.documentId)} 
                                src={`data:image/png;base64,${leader.docThumbnail}`}/>
                            }
                            actions={[
                                <DownloadOutlined onClick={() => handleImgClick(leader.documentId)}></DownloadOutlined>
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
