import * as React from "react";
import { LeftArrow, RightArrow } from "../../../../../components/arrow";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import './index.css'
import Courses_tag from './course-component'
import { Row } from "antd";
import Col from "antd/es/grid/col";
import { Courses } from '../../../../../models/course-type'
import httpClient from "../../../../../utility/http-client";
import {COMPLETED_COURSES_URL, CURRENT_COURSES_URL} from "../../../../../constants/global-constants";
import { configType } from "../../../../../models/config-type";


type GetCourseResponse = {
  data: Courses[];
};


function Scrollable_courses(props: any) {

  let url : string;
  if(props.props =="current"){
    url = CURRENT_COURSES_URL
  }
  if(props.props =="completed"){
    url = COMPLETED_COURSES_URL
  }
  console.log(props)
    const [Courses,setCourses] = React.useState({data:[{
      programDescription: "",
      id: 0,
      programTitle: "",
      programDuration: 0,
      rruDeeplink: "",
      rruProgramID: "",
      thumbnail:"",
      }]});

    const fetchCourses = React.useCallback(async()=>{
        const config: configType = {
          headerAuthorization: "",
          contentType: ""
        }
        const reqs = new httpClient(url,config)
        let response = await reqs.get("");
        console.log(response.data.data)
        const Course:GetCourseResponse = {data: response.data.data}
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
                {Courses.data.map(({ 
                  id,
                  programTitle,
                  programDescription,
                  programDuration,
                  rruDeeplink,
                  rruProgramID,
                  thumbnail }) => (<Courses_tag {... {
                    id,
                    programTitle,
                    programDescription,
                    programDuration,
                    rruDeeplink,
                    rruProgramID,
                    thumbnail}}/>))}

            </ScrollMenu>
            </Col>
          </Row>
          </div>
      </>
    );
  }

export default Scrollable_courses;