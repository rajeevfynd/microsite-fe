import { Affix, Avatar, Button, Card, Col, Divider, Row } from 'antd'
import Meta from 'antd/lib/card/Meta'
import * as React from 'react'
import './index.css';
import { ALT_THUMBNAIL } from '../../../constants/string-constants'
import { Announcement } from './announcement'
import { BirthDays } from './birthdays'
import { Events } from './events';
import { LearningChamps } from './learning-champs';
import { Feeds } from './feeds';

const ROW_GUTTER = { xs: 8, sm: 16, md: 24, lg: 32 };
const INNER_ROW_GUTTER = { xs: 2, sm: 2, md: 6, lg: 10 };

type HomePageProps = {
    mainContainerRef?: HTMLDivElement | null
}

export const HomePage = (props: HomePageProps) => {

    const QuickLink = (props: any) => {
        return (
            <>
                <Col span={12}>
                    <Card className='home-card' style={{ padding: "0px" }}>
                        <div className='centered-container'>
                            <Avatar style={{ width: "50px", height: "50px" }} />
                            <Meta title={<div><h6>{props.title}</h6></div>} style={{ marginTop: "5px" }} />
                        </div>
                    </Card>
                </Col>
            </>
        )
    }

    return (
        <>
            <Row gutter={ROW_GUTTER} style={{padding: "0% 5%"}}>
                <Col span={6} className="gutter-row">
                    <Affix offsetTop={120}>
                        <Events />
                        <Announcement />
                        <BirthDays />
                    </Affix>
                </Col>

                <Col span={12} className="gutter-row">
                    <Feeds />
                </Col>
                <Col span={6} className="gutter-row" style={{ position: "initial" }}>
                    <Affix offsetTop={120}>
                        <LearningChamps />
                    </Affix>
                </Col>

            </Row>
            {/* V1 Implementation <div>
                <Row gutter={ROW_GUTTER}>
                    <Col span={17} className="gutter-row">
                        <Row gutter={ROW_GUTTER}>
                            <Col span={6}>
                                <Events />
                            </Col>
                            <Col span={11}>
                                <Announcement />
                            </Col>
                            <Col span={7}>
                                <Row gutter={INNER_ROW_GUTTER}>
                                    <QuickLink title="R Samman" />
                                    <QuickLink title="Idea Corner" />
                                </Row>
                                <Row gutter={INNER_ROW_GUTTER} style={{ marginTop: "10px" }}>
                                    <QuickLink title="Podcast" />
                                    <QuickLink title="Rnr Corner" />
                                </Row>
                            </Col>
                        </Row>
                        <Row gutter={ROW_GUTTER}>
                            <Col span={24} style={{ marginTop: '40px', width: "100%" }}>
                                <Feeds />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={7} className="gutter-row">
                    <Row gutter={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
                            <Col className="gutter-row" style={{ width: '100%' }}>
                                <LearningChamps />
                            </Col>
                        </Row>
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
            </div> */}
        </>)
}
