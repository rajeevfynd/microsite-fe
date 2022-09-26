"strict"
import * as React from 'react';
import { Col, Row, } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';


export const CourseList = (props: any) => {


    const [courseList, setCourseList] = React.useState([]);



    React.useEffect(() => {

        setCourseList(props.courseList);

    }, []);


    const renderCourseList = (courseList: any[]) => {

        return courseList.map((course, index) => <Row key={index} style={{ justifyContent: "space-between" }}>
            <Col flex={1} ><h6>{course.name}</h6></Col>
            <Col style={{ alignItems: "end" }}> <MinusCircleOutlined style={{ fontSize: 20 }} /></Col>
        </Row>
        )
    }

    return (
        <>
            {!!courseList.length ? renderCourseList(courseList) : null}
        </>
    )
}






