"strict"
import * as React from 'react';
import { Col, message, Row, } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import httpInstance from '../../../../../utility/http-client';


export const CourseList = (props: any) => {
    const { handleMappingStatus, mappingStatus } = props;

    const [courseList, setCourseList] = React.useState([]);



    React.useEffect(() => {

        setCourseList(props.courseList);

    }, []);

    const handleRemoveCourse = (data: { tagId: number; courseId: number; }) => {

        const { tagId, courseId } = data;


        if (!tagId || !courseId) return;

        (() => {
            httpInstance.delete(`/microsite/course-tag/course-tag-by-course-id-and-tag-id?courseId=${courseId}&tagId=${tagId}`)
                .then((response) => {

                    handleMappingStatus(!mappingStatus);
                    message.success('Course successfully Removed');

                })
                .catch((error) => {
                    message.error("Something went wrong, Please try after sometime");
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






