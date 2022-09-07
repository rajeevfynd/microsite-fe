import * as React from "react";
import { LeftArrow, RightArrow } from "../../../../../components/arrow";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import './index.css'
import axios from 'axios';
import Courses_tag from './course-component'
import { Row } from "antd";
import Col from "antd/es/grid/col";
import { Courses } from '../../../../../models/course-type'


type GetCourseResponse = {
  data: Courses[];
};


function Scrollable_courses() {
    const [Courses,setCourses] = React.useState({data:[{
        id: 0,
        description:"",
        title:""
      }]});

    const fetchCourses = React.useCallback(async()=>{
        let response = await axios.get("http://127.0.0.1:8082/course/");
        console.log(response.data)
        const Course:GetCourseResponse = {data: response.data}
        setCourses(Course)
    },[])

    React.useEffect(() => {
        fetchCourses()
      }, [fetchCourses]);

    console.log(Courses)
    //console.log(items)
  
    return (
      <>
      <div className="scroll">
        <Row>
            <Col >
            <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            >
                {Courses.data.map(({ id,title,description }) => (<Courses_tag {... {id,title,description}}/>))}

            </ScrollMenu>
            </Col>
          </Row>
          </div>
      </>
    );
  }

export default Scrollable_courses;