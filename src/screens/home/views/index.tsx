import { Button, Card, Col, Divider, Row } from 'antd'
import Meta from 'antd/lib/card/Meta'
import * as React from 'react'
import './index.css';
import { ALT_THUMBNAIL } from '../../../constants/string-constants'
import { Announcement } from './announcement'
import { BirthDays } from './birthdays'
import { Events } from './events';
import { Feeds } from './feeds';

const ROW_GUTTER = { xs: 16, sm: 32, md: 48, lg: 64 };

export const HomePage = () => {
    return (
        <>
            <div>
                <Row gutter={ROW_GUTTER}>
                    <Col span={17} className="gutter-row">
                        <Row gutter={ROW_GUTTER}>
                            <Col span={6}>
                                <Events />
                            </Col>
                            <Col span={18}>
                                <Announcement />
                            </Col>
                        </Row>
                        <Row gutter={ROW_GUTTER}>
                            <Col span={24} style={{ marginTop: '40px', width: "100%" }}>
                                <Feeds />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={7} className="gutter-row">
                        <Row gutter={ROW_GUTTER}>
                            <Col className="gutter-row" style={{ width: '100%' }}>
                                <BirthDays />
                            </Col>
                        </Row>
                        <Row gutter={ROW_GUTTER}>
                            <Col className="gutter-row" style={{ marginTop: '40px', width: "100%" }}>
                                <Card className='home-card'>
                                    <Meta title={<div><h4>Idea Corner</h4></div>} />
                                    <Button type='primary' className='idea'> Submit Your Idea</Button>
                                    <br />
                                    <Card title="Idea Number 1">
                                        <p>This is the test idea to test the strength of the view's text input</p>
                                    </Card>
                                    <Card title="Idea Number 2">
                                        <p>This is the test idea </p>
                                    </Card>
                                    <Card title="Idea Number 3">
                                        <p>This is the test idea </p>
                                    </Card>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>)
}
