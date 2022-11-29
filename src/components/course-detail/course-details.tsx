import * as React from 'react';
import { List, Button, Modal, Row, Col, Image, Divider } from 'antd';
import Card from 'antd/lib/card/Card';


export function CourseDetails(props: { course: any }) {

    const { course } = props;


    return (
        <>
            <Card style={{ backgroundColor: "#e6f7ff" }}>
                <Row justify='space-between'>
                    <Col>
                        <Row>
                            <Col>
                                <Image
                                    width={400}
                                    height={200}
                                    src={course.thumbnail}
                                    fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ width: 400 }}>
                                <Button block type="primary" href={course.rruDeepLink} target="_blank" rel="noopener noreferrer"> Start Course </Button>
                            </Col>
                        </Row>

                    </Col>
                    <Col>

                        <Row style={{ textAlign: "center" }}>
                            <Col style={{ width: 400 }}>
                                <h5>
                                    {course.title}
                                </h5>
                            </Col>
                        </Row>
                        <Divider />
                        <Row style={{ textAlign: "justify" }}>
                            <Row>
                                <Col style={{ width: 400, }}>
                                    <b> <i> {course.description}</i></b>
                                </Col>
                            </Row>

                        </Row>

                    </Col>


                </Row>
            </Card>
            <Divider />
            <Row justify="space-between">
                <Card style={{ textAlign: "center", width: 300, backgroundColor: "#e6f7ff" }} >
                    <h5>Minimum Course Coin</h5>
                    <h5><i> {course.minCourseCoin}</i></h5>
                </Card>

                <Card style={{ textAlign: "center", width: 300, backgroundColor: "#e6f7ff" }}>
                    <h5>Course Coin</h5>
                    <h5><i>{course.courseCoin}</i></h5>
                </Card>

                <Card style={{ textAlign: "center", width: 300, backgroundColor: "#e6f7ff" }}>
                    <h5>Career Coin</h5>
                    <h5><i>{course.careerCoin}</i></h5>
                </Card>
            </Row>
        </>

    );
}
