import { Avatar, Button, Calendar, Card, Carousel, Col, Row, Typography } from 'antd';
import { now } from 'moment';
import * as React from 'react';
import { LearningEvent } from '../../../../models/enums/learning-event';
import "./index.scss";

type eventDetailsType = {
    survey ?: {
        name : string
        endDate : string
    },
    learning ?: {
        title : string,
        type : LearningEvent
    }
}

const getEvents = () => {
    return {
        survey : {
            name: 'Employee Survey',
            endDate: '2022-12-05 11:57:23.025829'
        },
        learning : {
            title: 'Higher Mathematics',
            type: LearningEvent.COURSE,

        }
    }
}


export const Events = () => {

    const handleLearningEvent = () => {
        console.log('click')
    }

    const [eventDetails, setEventDetails] = React.useState<eventDetailsType>()

    React.useEffect( ()=>{
        setEventDetails(getEvents());
    },[])
    return (
        <>
            <Card className="home-card" style={{ 
                backgroundImage: `url("https://via.placeholder.com/500")` 
            }}>
                {eventDetails==undefined && <div>
                    You are all caught up
                </div>}
                {eventDetails!=undefined && <Carousel autoplay pauseOnHover >
                    {
                        eventDetails.survey != undefined && 
                        <div >
                            <>
                                {eventDetails.survey.name} is still pending.
                                <Button type='link'>Click here to complete the survey</Button>
                            </>
                        </div>
                    }
                    {  
                        eventDetails.learning != undefined && 
                        <div>
                            <>
                                {eventDetails.learning.title} is in progress. 
                                <Button onClick={handleLearningEvent} type='link'>Click here to complete the {eventDetails.learning.type.toLowerCase()}</Button>
                            </>
                        </div>
                    }
                </Carousel>}
            </Card >
        </>
    )
}