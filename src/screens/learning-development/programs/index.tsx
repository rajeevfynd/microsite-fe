import { Result, Typography } from 'antd';
import Button from 'antd/lib/button';
import * as React from 'react'
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom'
import { ProgramDetail } from '../../../components/program-detail/program-detail';
import { ProgramDetailType } from '../../../models/journey-details';
import { getProgramDetails, processCourses } from '../../../service/program-service';

const { Text } = Typography;
export const ProgramDetailsView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ isExists, setIsExists ] = React.useState(true)
    const [ data, setData ] = React.useState({})

    const processData = (data: ProgramDetailType | any) => {
        const processedData = processCourses(data.courses, data.flow)
        data.programs = processedData.courses;
        data.progress = processedData.progress;
        setData(data)
        setIsExists(true);
    }

    React.useEffect( ()=>
    {   
        getProgramDetails(id).then( res => {
            processData(res.data);
        })
    }, [])
    
  return (
    <>
        <div><Button type='link' onClick={()=>{navigate(-1)}}>< ArrowLeft/> Back</Button></div>
        {isExists &&
        <>
        <ProgramDetail details={data} />
        </>
          
        }
        {
          !isExists &&
          <Result
            status="404"
            title={<Text type='secondary'>No Details Found</Text>}
          />
        }
    </>
  )
}
