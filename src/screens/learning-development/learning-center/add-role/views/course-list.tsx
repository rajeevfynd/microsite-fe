"strict"
import * as React from 'react';
import { Col, message, Row, } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import httpInstance from '../../../../../utility/http-client';


export const ProgramList = (props: any) => {
    //console.log(props)
    const { handleMappingStatus, mappingStatus, programTagList } = props;

    const [programList, setProgramList] = React.useState([]);



    React.useEffect(() => {
        // console.log(programList)

        setProgramList(programTagList);

    }, []);

    const handleRemoveProgram = (data: { tagId: number; programId: number; }) => {

        const { tagId, programId } = data;


        if (!tagId || !programId) return;

        (() => {
            httpInstance.delete(`/microsite/program-tag/program-tag-by-program-id-and-tag-id?programId=${programId}&tagId=${tagId}`)
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
            {programList && programList.length>0 ? programList.map(({program,tag}) => {
            //    console.log(program.program)
            return (<Row key={program.id.toString()+tag.id.toString()} style={{ justifyContent: "space-between" }}>
            <Col flex={1} ><h6>{program.title}</h6></Col>
            <Col style={{ alignItems: "end" }}> <MinusCircleOutlined style={{ fontSize: 20 }} onClick={() => handleRemoveProgram({ tagId: tag.id, programId: program.id })} /></Col>
        </Row>)
    }) : null}
        </>
    )
}






