import * as React from 'react';
import { AutoComplete, Button, Col, Form, Input, Row } from 'antd';
import httpInstance from '../../../../../utility/http-client';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

const validateStatus = {
    validating: 'validating',
    success: 'success'
}

export const CourseSearch = (props: any) => {
    const { handleCourseTagMapping, courseTagMapping } = props;


    const [buttonStatus, setButtonStatus] = React.useState(true);
    const [courseSearch, setCourseSearch] = React.useState({
        keyword: "",
        hasFeedback: false,
        validateStatus: validateStatus.validating,
        options: []
    });
    const [selectedCourses, setSelectedCourses] = React.useState([]);

    React.useEffect(() => {
        // search Api-> get courses by name 
        if (!courseSearch.keyword) return;

        if (!!courseSearch.options.length) {
            setCourseSearch({
                keyword: "",
                hasFeedback: true,
                validateStatus: validateStatus.success,
                options: []
            });

            return;
        }


        (() => {

            httpInstance.get(`/microsite/course/courses-by-title?title=${courseSearch.keyword}`)
                .then((response) => {

                    const result = response.data || [];

                    if (!result.length) return;

                    setCourseSearch({ ...courseSearch, options: response.data.length ? searchResult(result) : [] });

                })
                .catch((error) => {
                    window.alert(`${error.message}`);
                });
        })();

    }, [courseSearch.keyword])

    const searchResult = (course: { id: any; title: any; }[]) => {
        return course.map((course: { id: any; title: any; }, index) => {
            return {
                value: course.title,
                label: <Row key={index} style={{ justifyContent: "space-between" }} onClick={() => handlePlusIconClick({ id: course.id, title: course.title })}>
                    <Col flex={1} style={{ textAlign: "start" }}><p>{course.title}</p></Col>
                    <Col style={{ alignItems: "end" }} > <PlusCircleOutlined style={{ fontSize: 20 }} /></Col>
                </Row>
            }
        })
    }

    const handlePlusIconClick = (course: { id: number; title: string }) => {
        const newCourse = { id: course.id, title: course.title }

        if (selectedCourses.length) {
            const alreadyExists = selectedCourses.find(selectedCourse => selectedCourse.id === newCourse.id);

            if (alreadyExists) return;
        }

        setSelectedCourses((selectedCourses: any) => [...selectedCourses, newCourse]);

    }

    const handleMinusIconClick = (course: { id: number }) => {

        if (course.id) {
            const newSelectedCourses = selectedCourses.filter((selectedCourse) => selectedCourse.id !== course.id);
            setSelectedCourses(newSelectedCourses);

            if (!selectedCourses.length) setButtonStatus(true);
        }
    }

    React.useEffect(() => {

        if (!selectedCourses.length) {
            setButtonStatus(true)
            return;
        }

        setCourseSearch({
            keyword: "",
            hasFeedback: true,
            validateStatus: validateStatus.success,
            options: []
        });

        setButtonStatus(false);

    }, [selectedCourses])


    const onFinish = (values: any) => {
        handleCourseTagMapping({
            ...courseTagMapping,
            courseIds: selectedCourses.map(selectedCourse => selectedCourse.id),
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onValuesChange = (changedValues: any, allValues: any) => {
        const stringReg = new RegExp("^[0-9]*[a-zA-Z]+[a-zA-Z0-9]*");

        const key = Object.keys(changedValues)[0];
        switch (key) {

            case 'course':
                const course = changedValues[key].toLowerCase();

                if (!course) {

                    setCourseSearch({ ...courseSearch, keyword: "", hasFeedback: false, options: [] });
                }

                if (stringReg.test(course)) {
                    setCourseSearch({ ...courseSearch, keyword: course, hasFeedback: true, validateStatus: validateStatus.validating, options: [] });
                }
                break;

            default:
                break;
        }

    };

    const handleValidationStatus = () => {
        return courseSearch.options.length ? "success" : "validating";
    }

    return (
        <>
            <Form
                layout={'vertical'}
                onValuesChange={onValuesChange}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                initialValues={{
                    course: courseSearch.keyword,
                }}

            >
                <Form.Item
                    name="course"
                    label="Course Title"
                    validateStatus={handleValidationStatus()}
                    hasFeedback={courseSearch.hasFeedback}
                >
                    <AutoComplete
                        style={{ textAlign: "start" }}
                        placeholder='Start Typing Course Name or Keyword...'
                        allowClear
                        options={courseSearch.options}
                        value={courseSearch.keyword}
                    />
                </Form.Item>


                {selectedCourses.map((selectedCourse, index) => <>
                    <Row key={index} style={{ justifyContent: "space-between" }}>
                        <Col flex={1} style={{ textAlign: "start" }}><h6>{selectedCourse.title}</h6></Col>
                        <Col style={{ alignItems: "end" }}> <MinusCircleOutlined style={{ fontSize: 20 }} onClick={() => handleMinusIconClick({ id: selectedCourse.id })} /></Col>
                    </Row>
                </>
                )}

                <br />

                <Form.Item>
                    <Button disabled={buttonStatus} type="primary" htmlType="submit" block >
                        Done
                    </Button>

                </Form.Item>
            </Form>
        </>
    )
}






