import { Avatar, Card, Col, Row, Typography } from 'antd';
import Meta from 'antd/lib/card/Meta';
import * as React from 'react';
import { BookHalf, ListColumns } from 'react-bootstrap-icons';
import "./index.scss";

interface EventType {
    icon: React.ReactElement<any, any> | null,
    src?: string
    message: string,
    navigation?: string
    type: "SURVEY" | "COURSE_IN_PROGRESS"
}

const surveys: EventType[] = [
    {
        src: "https://www.voxco.com/wp-content/uploads/2021/04/students-feedback-survey-cvr.jpg",
        icon: <ListColumns />,
        message: "Survey is assigned to you",
        type: "SURVEY"
    }
]

const assignedCourse: EventType[] = [
    {
        src: "https://prod-discovery.edx-cdn.org/media/course/image/156313d6-f892-4b08-9cee-43ea582f4dfb-7b98c686abcc.small.png",
        icon: <BookHalf />,
        message: "AI beginner course is in progress",
        type: "COURSE_IN_PROGRESS"
    }
]

export const Events = () => {
    return (
        <>
            <Card className="home-card" style={{height: "270px"}}>
                <Row gutter={[8, 8]}>
                    <Col className='gutter-row' span={16}>
                        <Card hoverable className='home-card' bodyStyle={{ padding: "10px" }}>
                            <div className='event-box'>
                                <Avatar style={{ margin: 'auto', width: '51px', height: '51px' }}
                                    src={assignedCourse[0].src}
                                    icon={assignedCourse[0].icon}
                                />
                                <Typography.Text style={{ fontSize: "13px" }}>{assignedCourse[0].message}</Typography.Text>
                            </div>
                        </Card>
                    </Col>
                    <Col className='gutter-row' span={8}>
                        <Card hoverable className='home-card' bodyStyle={{ padding: "10px" }}>
                            <div className='event-box'>
                                <Avatar className='small-event'
                                    icon={assignedCourse[0].icon}
                                />
                            </div>
                        </Card>
                        <Card hoverable className='home-card' style={{ marginTop: "5px" }} bodyStyle={{ padding: "10px" }}>
                            <div className='event-box'>
                                <Avatar className='small-event'
                                    icon={surveys[0].icon}
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Card >
        </>
    )
}