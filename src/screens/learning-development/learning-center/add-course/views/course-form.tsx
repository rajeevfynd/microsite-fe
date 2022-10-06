import { Card, Row, Button, Image, Form, Input, } from 'antd'
import * as React from 'react'

export default function CourseForm() {
    const [course, setCourse] = React.useState({
        title: null,
        rruDeepLink: null,
        programId: null,
        thumbnail: null,
        minCourseCoin: null,
        courseCoin: null,
        careerCoin: null,
        createdBy: null,
        updatedBy: null,
        status: true
    });
    const [buttonStatus, setButtonStatus] = React.useState(true);






    const onValuesChange = (changedValues: any, allValues: any) => {

        const stringReg = new RegExp("^[0-9]*[a-zA-Z]+[a-zA-Z0-9]*");
        const integerReg = new RegExp("(?<!-)(?<!\d)[1-9][0-9]*");
        const urlReg = new RegExp("((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)");

        const key = Object.keys(changedValues)[0];
        switch (key) {
            case 'title':
                const title = changedValues[key];

                if (stringReg.test(title)) {
                    setCourse({ ...course, title: title });
                    setButtonStatus(false);
                } else {
                    setButtonStatus(true);
                }
                break;

            case 'rruDeepLink':
                const rruDeepLink = changedValues[key];

                if (urlReg.test(rruDeepLink)) {
                    setCourse({ ...course, rruDeepLink: rruDeepLink });
                    setButtonStatus(false);
                } else {
                    setButtonStatus(true);
                }
                break;

            case 'thumbnail':
                const thumbnail = changedValues[key];

                if (urlReg.test(thumbnail)) {
                    setCourse({ ...course, thumbnail: thumbnail });
                    setButtonStatus(false);
                } else {
                    setButtonStatus(true);
                }
                break;

            case 'minCourseCoin':
                const minCourseCoin = changedValues[key];

                if (integerReg.test(minCourseCoin)) {
                    setCourse({ ...course, minCourseCoin: Number(minCourseCoin) });
                    setButtonStatus(false);
                } else {
                    setButtonStatus(true);
                }
                break;

            case 'courseCoin':
                const courseCoin = changedValues[key];

                if (integerReg.test(courseCoin)) {
                    setCourse({ ...course, courseCoin: Number(courseCoin) });
                    setButtonStatus(false);
                } else {
                    setButtonStatus(true);

                }
                break;

            case 'careerCoin':
                const careerCoin = changedValues[key];

                if (courseCoin >= 1) {
                    return
                }

                if (integerReg.test(careerCoin)) {
                    setCourse({ ...course, careerCoin: Number(careerCoin) });
                    setButtonStatus(false);
                } else {
                    setButtonStatus(true);
                    console.log(careerCoin);
                }
                break;

            default:
                break;
        }

    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
        console.log("courseState ->  ", course)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const renderImage = (imageUrl: string) => {
        if (!imageUrl) return;

        return <>
            <Image src={course.thumbnail} height={200} width={450} />
        </>
    }

    return (
        <Row style={{ justifyContent: "center" }}>
            <Card title="Create Course" bordered={true} style={{ width: 500, textAlign: "center" }}>
                <Form
                    layout="vertical"
                    name="courseForm"
                    initialValues={{
                        title: course.title,
                        rruDeepLink: course.rruDeepLink,
                        thumbnail: course.thumbnail,
                        minCourseCoin: course.minCourseCoin,
                        courseCoin: course.careerCoin,
                        careerCoin: course.careerCoin
                    }}
                    onValuesChange={onValuesChange}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please input Title!' }, { type: "string", message: "Please input valid Title" }]}
                    >
                        <Input placeholder="title" />
                    </Form.Item>

                    <Form.Item
                        name="rruDeepLink"
                        label="RRU Deep Link"
                        rules={[{ required: true, message: 'Please input RRU Deep Link!' }, { type: "url", message: 'Please input valid RRU Deep Link!' }]}
                    >
                        <Input placeholder="https://rruDeepLink/" />
                    </Form.Item>

                    <Form.Item
                        name="thumbnail"
                        label="Thumbnail"
                        rules={[{ required: true, message: 'Please input Thumbnail!' }, { type: "url", message: 'Please input valid Thumbnail!' }]}
                    >
                        <Input placeholder="https://thumbnail/" />
                    </Form.Item>

                    {renderImage(course.thumbnail)}

                    <Form.Item
                        name="minCourseCoin"
                        label="Minimum Course Coin"
                        rules={[{ required: true, message: 'Please input Minimum Course Coin!', },]}
                    >
                        <Input type="number" placeholder="0" />
                    </Form.Item>

                    <Form.Item
                        name="courseCoin"
                        label="Course Coin"
                        rules={[{ required: true, message: 'Please input course Coin!' }]}
                    >
                        <Input placeholder="0" />
                    </Form.Item>

                    <Form.Item
                        name="careerCoin"
                        label="Career Coin"
                        rules={[{ required: true, message: 'Please input career Coin!' }]}
                    >
                        <Input type="number" placeholder="0" />
                    </Form.Item>


                    <Form.Item>
                        <Button block type="primary" htmlType="submit" disabled={buttonStatus} >
                            Create Course
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Row>
    )
}
