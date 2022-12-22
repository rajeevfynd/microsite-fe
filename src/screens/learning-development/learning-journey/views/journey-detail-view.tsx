import { Result, Typography } from 'antd';
import Button from 'antd/lib/button';
import * as React from 'react'
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom'
import { JourneyDetail } from '../../../../components/journey-detail/journey-detail';
import { JourneyDetailType } from '../../../../models/journey-details';
import { getJourneyDetails, processPrograms } from '../../../../service/journey-service';

const { Text } = Typography;
export const JourneyDetailView = () => {
    const { id } = useParams<string>();
    const navigate = useNavigate();
    const [ data, setData ] = React.useState<JourneyDetailType>()
    const [ isExists, setIsExists ] = React.useState(false)

    const processData = (data: JourneyDetailType | any) => {
        const processedData = processPrograms(data.programs, data.flow)
        data.programs = processedData.programs;
        data.progress = processedData.progress;
        setData(data)
        setIsExists(true);
    }

    React.useEffect( ()=>
    {   
      if(id) {
        getJourneyDetails(id).then( res => {
            processData(res.data);
        })
      }
    }, [])
    
  return (
    <>
        <div><Button type='link' onClick={()=>{navigate(-1)}}>< ArrowLeft/> Back</Button></div>
        <div className='body-container'>
        {isExists &&
          <JourneyDetail details={data}></JourneyDetail>
        }
        {
          !isExists &&
          <Result
            status="404"
            title={<Text type='secondary'>No Details Found</Text>}
          />
        }
        </div>
    </>
  )
}
