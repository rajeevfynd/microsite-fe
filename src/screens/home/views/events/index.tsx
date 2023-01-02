import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Card, Carousel, Image, Modal } from 'antd';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseDetails } from '../../../../components/course-detail/course-details';
import { DEFAULT_LND_THUMBNAIL } from '../../../../constants/string-constants';
import { LearningEvent } from '../../../../models/enums/learning-events';
import { getLearningEvents } from '../../../../service/event-service';
import { getCourseById } from '../../../../service/program-service';
import { getSurveyEvent } from '../../../../service/survey-service';
import { formatBase64 } from '../../../../utility/image-utils';
import "./index.scss";

type LearningEventType = {
    id : string,
    title : string,
    thumbnail : string,
    type : LearningEvent
}

type SurveyEventType = {
    id: string,
    surveyTitle: string,
    imgUrl: string,
}

export const Events = () => {

    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [courseDetails, setCourseDetails] = React.useState({});
    const [learningEvent, setLearningEvent] = React.useState<LearningEventType>()
    const [surveyEvent, setSurveyEvent] = React.useState<SurveyEventType>()

    const handleLearningEvent = () => {
        if(learningEvent){
            if(learningEvent.type == LearningEvent.JOURNEY){
                navigate('/lnd/learning-journey/'+learningEvent.id)
           }
           else if(learningEvent.type == LearningEvent.PROGRAM){
                navigate('/lnd/programs/'+learningEvent.id)
           }
           else if(learningEvent.type == LearningEvent.COURSE){
                getCourseById(learningEvent.id).then( res =>
                    {
                        setCourseDetails(res.data)
                        setIsModalOpen(true)
                    }
                )
            }
        }
    }

    React.useEffect( ()=>{
        getLearningEvents().then( res=> {
            setLearningEvent(res.data)
        })
        getSurveyEvent().then( res=> {
            setSurveyEvent(res.data)
        })
    },[])
    return (
        <>
            <Modal
            title="Course Details"
            visible={isModalOpen}
            footer={null}
            onCancel={()=>{setIsModalOpen(false)}}
            width={1000}
            style={{ top: 100 }}>
                <CourseDetails course={courseDetails} />
            </Modal>
            <Card className="home-card">
                <Carousel autoplay pauseOnHover effect='fade' dots={false}>
                    {
                        surveyEvent != undefined &&
                        <div
                            className='event-carousel'
                        >
                            <h6 style={{height:'40px'}}>
                                "{surveyEvent.surveyTitle}" is due
                            </h6>
                            <Image src={formatBase64(surveyEvent.imgUrl)} className='event-img' preview={false} height='80px' width='80px'/>
                            <div>
                                <Button onClick={()=>navigate('/survey/submit/survey/'+surveyEvent.id+'/2')} type='link' className='event-link'>Go to Survey </Button>
                             </div>
                        </div>
                    }
                    {  
                        learningEvent != undefined && 
                        <div
                            className='event-carousel'
                        >
                            <h6 style={{height:'40px'}}>
                                Continue learning "{learningEvent.title}"
                            </h6>
                            <Image src={formatBase64(learningEvent.thumbnail)} className='event-img' preview={false} height='80px' width='80px' fallback={DEFAULT_LND_THUMBNAIL} />
                            <div>
                                <Button onClick={handleLearningEvent} type='link' className='event-link'>Go to {learningEvent.type.toLowerCase()} </Button>
                             </div>
                        </div>
                    }
                    {
                        learningEvent == undefined &&
                        <div
                            className='event-carousel'>
                            <h4 style={{height:'40px'}}>
                                You are all caught up!
                            </h4>
                            <div style={{margin:'10px'}}>
                                <CheckCircleOutlined style={{fontSize:'75px', color:'green'}}/>
                             </div>
                            <Button onClick={()=>{navigate('/lnd/learning-center/lnd-hero')}} type='link' className='event-link'>Go to Learning Center </Button>
                        </div>
                    }
                </Carousel>
            </Card >
        </>
    )
}