import { Avatar, Button, Card, Carousel, Col, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import * as React from 'react';
import { ArrowRight } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { LearningEvent } from '../../../../models/enums/learning-event';
import { getLearningEvents } from '../../../../service/event-service';
import "./index.scss";

type LearningEventType = {
    id : number,
    title : string,
    thumbnailLink : string,
    type : LearningEvent
}

type SurveyEventType = {
    title : string
}


export const Events = () => {

    const navigate = useNavigate()

    const handleLearningEvent = () => {
       if(learningEvent.type == LearningEvent.JOURNEY){
        navigate('/lnd/learning-journey/'+learningEvent.id)
       }
       else if(learningEvent.type == LearningEvent.PROGRAM){
        navigate('/lnd/programs/'+learningEvent.id)
       }
    }

    const [learningEvent, setLearningEvent] = React.useState<LearningEventType>()
    const [surveyEvent, setSurveyEvent] = React.useState<SurveyEventType>()

    React.useEffect( ()=>{
        getLearningEvents().then( res=> {
            setLearningEvent(res.data)
        })
    },[])
    return (
        <>
            <Card className="home-card" style={{padding:0}}>
                <Carousel autoplay pauseOnHover effect='fade'>
                    {
                        <Card
                            className='event-carousel background-yellow'>
                            <h6 style={{color: 'white'}}>
                                Employee survey is still pending
                            </h6>
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
                            <h6 style={{color: 'white'}}>Continue learning "{learningEvent.title}"</h6>
                            <Button onClick={handleLearningEvent} type='default' className='event-link'>Go to {learningEvent.type.toLowerCase()} </Button>
                        </Card>
                    }
                    {   
                        <Card
                            className='event-carousel background-green'>
                            <h6 style={{color: 'white'}}>You are all caught up!</h6>
                            <Button onClick={()=>{navigate('/lnd/learning-center/lnd-hero')}} type='default' className='event-link'>Go to Learning Center </Button>
                        </Card>
                    }
                </Carousel>
            </Card >
        </>
    )
}