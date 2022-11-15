import { Button, Card, Col, Divider, Row } from 'antd'
import Meta from 'antd/lib/card/Meta'
import * as React from 'react'
import './index.css'
import { ALT_THUMBNAIL } from '../../../constants/string-constants'
import { Announcement } from './announcement'
import { BirthDays } from './birthdays'

export const HomePage = () => {
    return (
        <>
            <div>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={16} className="gutter-row">
                        <Row>
                            <Announcement />
                        </Row>
                    </Col>
                    <Col span={8} className="gutter-row">
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col className="gutter-row" style={{ width: '100%' }}>
                                <BirthDays />
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col className="gutter-row">
                                <Card style={{ width: '100%' }}>
                                    <Meta title={<div style={{ paddingBottom: '10px' }}><h4>Idea Corner</h4></div>} />
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
