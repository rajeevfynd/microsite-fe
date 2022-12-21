import * as React from "react";
import { LeftArrow, RightArrow } from "../../../../../components/arrow";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import './index.css'
import Programs_tag from './program-component'
import { Row } from "antd";
import Col from "antd/es/grid/col";
import { Program } from '../../../../../models/course-type'
import httpInstance from "../../../../../utility/http-client";
import {COMPLETED_PROGRAMS_URL, CURRENT_PROGRAMS_URL} from "../../../../../constants/urls";
import { configType } from "../../../../../models/config-type";
import { getUserPrograms } from "../../../../../service/program-service"


type GetProgramResponse = {
  data: Program[];
};


function ScrollablePrograms(props: any) {

  let url : string;
  if(props.props =="current"){
    url = CURRENT_PROGRAMS_URL
  }
  if(props.props =="completed"){
    url = COMPLETED_PROGRAMS_URL
  }
    const [d,setd] = React.useState(false)
    const [Programs,setProgram] = React.useState({data:[{
      id:"",
      description: "",
      title: "",
      duration: 0,
      thumbnail:"",
      }]});

    const fetchPrograms = React.useCallback(async()=>{
        let response = await getUserPrograms(url);
        const Program:GetProgramResponse = {data: response.data}
        setd(Program.data.length != 0)
        setProgram(Program)
    },[])

    React.useEffect(() => {
        fetchPrograms()
      }, [fetchPrograms]);

  
    return (
      <>
      <div className="scroll" >{
      d && 
        <Row>
            <Col >
            <div className="arrow">
            <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            >
                {Programs.data.map(({ 
                  id,
                  title,
                  description,
                  duration,
                  thumbnail }) => (<Programs_tag {... {
                    id,
                    title,
                    description,
                    duration,
                    thumbnail}}/>))}

            </ScrollMenu>
            </div>
            </Col>
          </Row>
          }
          {
            !d &&
            <Row><Col>
            <p> No Programs to display </p>
            </Col></Row>
          }
          </div>
      </>
    );
  }

export default ScrollablePrograms;