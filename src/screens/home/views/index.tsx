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

    return (
        <>
            <Row gutter={ROW_GUTTER} style={{padding: "0% 5%"}}>
                <Col span={6} className="gutter-row">
                    <Affix offsetTop={20}>
                        <Events />
                        <LearningChamps />
                    </Affix>
                </Col>

                <Col span={12} className="gutter-row">
                    <Feeds />
                </Col>
                <Col span={6} className="gutter-row" style={{ position: "initial" }}>
                    <Affix offsetTop={120}>
                        <BirthDays />
                        <Announcement />
                    </Affix>
                </Col>

            </Row>
        </>)
}
