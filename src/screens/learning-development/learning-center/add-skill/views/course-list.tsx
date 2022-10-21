"strict"
import * as React from 'react';
import { Col, Row, } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import httpInstance from '../../../../../utility/http-client';


export const CourseList = (props: any) => {
    const { handleMappingStatus } = props;

    const [courseList, setCourseList] = React.useState([]);



    React.useEffect(() => {

        setCourseList(props.courseList);

    }, []);

    const handleRemoveCourse = (data: { tagId: number; courseId: number; }) => {

        const { tagId, courseId } = data;

        console.log(tagId, courseId);

        if (!tagId || !courseId) return;

        (() => {
            httpInstance.delete(`/microsite/course-tag/course-tag-by-course-id-and-tag-id?courseId=${courseId}&tagId=${tagId}`)
                .then((response) => {

                    console.log(response);
                    handleMappingStatus(true);


                })
                .catch((error) => {
                    console.log(error.message);
                    window.alert(`${error.message}`);
                });
        })();


    };

    const renderCourseList = (courseList: any[]) => {

        return courseList.map(({ course, tag }, index) => <Row key={index} style={{ justifyContent: "space-between" }}>
            <Col flex={1} ><h6>{course.title}</h6></Col>
            <Col style={{ alignItems: "end" }}> <MinusCircleOutlined style={{ fontSize: 20 }} onClick={() => handleRemoveCourse({ tagId: tag.id, courseId: course.id })} /></Col>
        </Row>
        )
    }

    return (
        <>
            {!!courseList.length ? renderCourseList(courseList) : null}
        </>
    )
}






