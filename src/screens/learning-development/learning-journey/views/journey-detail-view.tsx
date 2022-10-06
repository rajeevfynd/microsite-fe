import { Result, Typography } from 'antd';
import Button from 'antd/lib/button';
import * as React from 'react'
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom'
import { JourneyDetail } from '../../../../components/journey-detail/journey-detail';
import { Flow } from '../../../../models/enums/flow';
import { ProgressStatus } from '../../../../models/enums/progress-status';
import { JourneyDetailType, ProgramType } from '../../../../models/journey-details';
import httpInstance from '../../../../utility/http-client';

const { Text } = Typography;
export const JourneyDetailView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ data, setData ] = React.useState({})
    const [ isExists, setIsExists ] = React.useState(false)

    const processData = (data: JourneyDetailType | any) => {
        const processedData = processPrograms(data.programs, data.flow)
        data.programs = processedData.programs;
        data.progress = processedData.progress;
        setData(data)
        setIsExists(true);
      }
    
      const processPrograms = (programs: ProgramType[], flow: string) => {
        if (programs && programs.length > 0) {
          const progress = Math.round(programs.filter(program => program.status == 'COMPLETED').length * 100 / programs.length);
          let flowKey = flow as keyof typeof Flow;
          if (Flow[flowKey] == Flow.SEQUENCE)
            programs.every(program => {
              program.isActive = true;
              let enumKey = program.status as keyof typeof ProgressStatus;
              if (ProgressStatus[enumKey] != ProgressStatus.COMPLETED) {
                return false;
              }
              return true;
            })
          return {
            programs: programs,
            progress: progress
          };
        }
      }

    React.useEffect( ()=>
    {   
        httpInstance.get('/microsite/lnd/journeys/details/'+id).then( res => {
            console.log(res.data);
            processData(res.data);
        })
    }, [])
  return (
    <>
        <div><Button type='link' onClick={()=>{navigate(-1)}}>< ArrowLeft/> Back</Button></div>
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
    </>
  )
}
