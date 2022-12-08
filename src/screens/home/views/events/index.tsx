import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Card, Carousel, Image, Modal } from 'antd';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseDetails } from '../../../../components/course-detail/course-details';
import { LearningEvent } from '../../../../models/enums/learning-event';
import { getLearningEvents } from '../../../../service/event-service';
import { getCourseById } from '../../../../service/program-service';
import "./index.scss";
import Meta from 'antd/lib/card/Meta';

type LearningEventType = {
    id : string,
    title : string,
    thumbnailLink : string,
    type : LearningEvent
}

type SurveyEventType = {
    title : string
}


export const Events = () => {

    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [courseDetails, setCourseDetails] = React.useState({});

    const handleLearningEvent = () => {
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

    const [learningEvent, setLearningEvent] = React.useState<LearningEventType>()

    React.useEffect( ()=>{
        getLearningEvents().then( res=> {
            console.log(res)
            setLearningEvent(res.data)
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
                        learningEvent != undefined && 
                        <div
                            className='event-carousel'
                        >
                            <h6 style={{height:'40px'}}>
                                Continue learning "{learningEvent.title}"
                            </h6>
                            <Image src={`data:image/png;base64,${learningEvent.thumbnailLink}`} preview={false} height='80px' width='100px'/>
                            <div>
                                <Button onClick={handleLearningEvent} type='link' className='event-link'>Go to {learningEvent.type.toLowerCase()} </Button>
                             </div>
                        </div>
                    }
                    {
                        learningEvent != undefined &&
                        <div
                            className='event-carousel'>
                            <h6 style={{height:'40px'}}>
                                You are all caught up!
                            </h6>
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