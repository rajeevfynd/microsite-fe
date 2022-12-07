import { CaretRightOutlined, CheckCircleFilled, CheckCircleOutlined, FieldTimeOutlined, PauseOutlined, WarningOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Carousel, Col, Modal, Row } from 'antd';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseDetails } from '../../../../components/course-detail/course-details';
import { LearningEvent } from '../../../../models/enums/learning-event';
import { getLearningEvents } from '../../../../service/event-service';
import { getCourseById } from '../../../../service/program-service';
import "./index.scss";

type LearningEventType = {
    id : string,
    title : string,
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
    const [surveyEvent, setSurveyEvent] = React.useState<SurveyEventType>()

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
            <Card className="home-card" style={{padding:0}}>
                <Carousel autoplay pauseOnHover effect='fade'>
                    {
                        <Card
                            className='event-carousel background-yellow'>
                            <h6 style={{color: 'white', height:'50px'}}>
                                "Employee Happiness Survey" is still pending
                            </h6>
                            <div style={{color:'white', margin:'10px'}}>
                                <FieldTimeOutlined style={{fontSize:'30px'}}/>
                             </div>
                            
                            <Button onClick={handleLearningEvent} type='default' className='event-link'>
                                Go to survey 
                            </Button>
                        </Card>
                    }
                    {  
                        learningEvent != undefined && 
                        <Card
                            className='event-carousel background-blue'
                        >
                            <h6 style={{color: 'white', height:'50px'}}>
                                Continue learning "{learningEvent.title}"
                            </h6>
                            <div style={{color:'white', margin:'10px'}}>
                                <PauseOutlined style={{fontSize:'30px'}}/>
                             </div>
                            
                            <Button onClick={handleLearningEvent} type='default' className='event-link'>Go to {learningEvent.type.toLowerCase()} </Button>
                        </Card>
                    }
                    {   
                        <Card
                            className='event-carousel background-green'>
                            <h6 style={{color: 'white', height:'50px'}}>
                                You are all caught up!
                            </h6>
                            <div style={{color:'white', margin:'10px'}}>
                                <CheckCircleOutlined style={{fontSize:'30px'}}/>
                             </div>
                            <Button onClick={()=>{navigate('/lnd/learning-center/lnd-hero')}} type='default' className='event-link'>Go to Learning Center </Button>
                        </Card>
                    }
                </Carousel>
            </Card >
        </>
    )
}