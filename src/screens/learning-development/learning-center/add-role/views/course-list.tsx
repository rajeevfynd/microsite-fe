"strict"
import * as React from 'react';
import { Col, message, Row, } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import httpInstance from '../../../../../utility/http-client';


export const ProgramList = (props: any) => {
    //console.log(props)
    const { handleMappingStatus, mappingStatus, programTagList } = props;

    const [courseList, setProgramList] = React.useState([]);



    React.useEffect(() => {
        // console.log(programList)

        setProgramList(programTagList);

    }, []);

    const handleRemoveProgram = (data: { tagId: number; courseId: number; }) => {

        const { tagId, courseId } = data;


        if (!tagId || !courseId) return;

        (() => {
            httpInstance.delete(`/microsite/program-tag/program-tag-by-program-id-and-tag-id?programId=${courseId}&tagId=${tagId}`)
                .then((response) => {

                    handleMappingStatus(!mappingStatus);
                    message.success('Program successfully Removed');
                    
                })
                .catch((error) => {
                    message.error("Something went wrong, Please try after sometime");
                });
        })();


    };


    return (
        <>
            {courseList && courseList.length>0 ? courseList.map(({program,tag}) => {
            //    console.log(program.program)
            return (<Row key={program.id.toString()+tag.id.toString()} style={{ justifyContent: "space-between" }}>
            <Col flex={1} ><h6>{program.title}</h6></Col>
            <Col style={{ alignItems: "end" }}> <MinusCircleOutlined style={{ fontSize: 20 }} onClick={() => handleRemoveProgram({ tagId: tag.id, courseId: program.id })} /></Col>
        </Row>)
    }) : null}
        </>
    )
}






