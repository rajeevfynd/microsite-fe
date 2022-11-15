import { Button, Card, Col, Divider, Row } from 'antd'
import Meta from 'antd/lib/card/Meta'
import * as React from 'react'
import './index.css'
import { ALT_THUMBNAIL } from '../../../constants/string-constants'
import { Announcement } from './announcement'

export const HomePage = () => {
    return (
        <>
            <div>
                <Col span={16}>
                    <Row>
                        <Announcement />
                    </Row>
                    <Divider orientation="left">Horizontal</Divider>
                </Col>

            </div>
        </>)
}

/**
 * <Col flex={8}>
                        <div className="announcements">
                            <Card className="announcements" >
                                <Meta title={<div style={{ paddingBottom: '10px' }}><h4>Birthday Section</h4></div>} />
                                <a href=''>
                                    <img alt={ALT_THUMBNAIL} height='191px' width='460px' src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'} />
                                </a>
                            </Card>
                        </div>
                        <br/>
                        <Row>
                            <Col>
                                <Button type='primary' className='rsamman'><h4 style={{color:'white'}}>RSamman</h4></Button>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col>
                                <Card >
                                    <Meta title={<div style={{ paddingBottom: '10px' }}><h4>Idea Corner</h4></div>} />
                                    <Button type='primary' className='idea'> Submit Your Idea</Button>
                                    <br/>
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
 */
