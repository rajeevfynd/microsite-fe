import * as React from 'react';
import { List, Button, Modal, Row, Col, Image, Divider } from 'antd';
import Card from 'antd/lib/card/Card';
import { DEFAULT_LND_THUMBNAIL } from '../../constants/string-constants';
import { formatBase64 } from '../../utility/image-utils';


export function CourseDetails(props: { course: any }) {

    const { course } = props;


    return (
        <>
            <Card >
                <Row justify='space-between'>
                    <Col>
                        <Row>
                            <Col>
                                <Image
                                    width={400}
                                    height={200}
                                    src={formatBase64(course.thumbnail)}
                                    fallback={DEFAULT_LND_THUMBNAIL} 
                                    preview={false}
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

                        <Row style={{ textAlign: "justify", overflow: "scroll" }}>
                            <Row style={{marginRight:"10px"}}>
                                <Col style={{ width: 400, height: 200 }}>
                                    <> <i> {course.description}</i></>
                                </Col>
                            </Row>

                        </Row>

                    </Col>


                </Row>
            </Card>
            <Divider />
            <Row justify="space-between">
                <Card style={{ textAlign: "center", width: 300 }} >
                    <h5>Minimum Course Coin</h5>
                    <h5><i> {course.minCourseCoin}</i></h5>
                </Card>

                <Card style={{ textAlign: "center", width: 300 }}>
                    <h5>Course Coin</h5>
                    <h5><i>{course.courseCoin}</i></h5>
                </Card>

                <Card style={{ textAlign: "center", width: 300 }}>
                    <h5>Career Coin</h5>
                    <h5><i>{course.careerCoin}</i></h5>
                </Card>
            </Row>
        </>

    );
}
