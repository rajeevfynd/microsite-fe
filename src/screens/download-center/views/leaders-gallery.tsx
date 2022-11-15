import { Avatar, Card, Col, Row } from 'antd'
import * as React from 'react'
import {DownloadOutlined} from '@ant-design/icons';
import { Content } from 'antd/lib/layout/layout';

export const LeadersGallery = () => {
    
    const { Meta } = Card;

    return (
        <>
        <Row>
            <h1>Leaders' Gallery</h1>
        </Row>
        <Row>
            <Content>
                <Row>
                    <Col xs={24} xl={8}>
                        <Card
                            style={{ width: 300 }}
                            cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                            }
                            actions={[
                                <DownloadOutlined></DownloadOutlined>
                            ]}
                            >
                            <Meta
                                title="Card title"
                                description="This is the description"
                            />
                        </Card>
                    </Col>
                    <Col xs={24} xl={8}>
                        <Card
                            style={{ width: 300 }}
                            cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                            }
                            actions={[
                                <DownloadOutlined></DownloadOutlined>
                            ]}
                            >
                            <Meta
                                title="Card title"
                                description="This is the description"
                            />
                        </Card>
                    </Col>
                    <Col xs={24} xl={8}>
                        <Card
                            style={{ width: 300 }}
                            cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                            }
                            actions={[
                                <DownloadOutlined></DownloadOutlined>
                            ]}
                            >
                            <Meta
                                title="Card title"
                                description="This is the description"
                            />
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Row>
        </>
    )

}