import { Card, Col, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import * as React from 'react'
import { announcementType } from '../../../../models/announcementType';
import { getAnnouncement } from '../../../../service/announcment-service';
import AnnouncementModal from './announcement-modal';
import Lottie from "lottie-react";
import './index.css'


export const Announcement = () => {
    const [announcements, setAnnouncements] = React.useState<announcementType[]>([])
    const [announcementAnnimation,setAnnouncementAnimation] = React.useState()
    const fetchAnncouncement = React.useCallback(async () => {
        let response = await getAnnouncement();
        const announcement_list: announcementType[] = response.data
        setAnnouncements(announcement_list)
    }, [])
    const [loop, setLoop] = React.useState<boolean|number>(1)
    React.useEffect(() => {
        fetchAnncouncement()
    }, [fetchAnncouncement])

    React.useEffect( () => {
        fetch('https://assets8.lottiefiles.com/private_files/lf30_ogsgtes0.json').then( response => response.json()).then( json => {
            setAnnouncementAnimation(json)
        })
    }, [] )

    return (<>
        <Card className="home-card">
            <Meta title={<div style={{ paddingBottom: '10px' }}>
            <Row>
                <Col style={{ paddingTop: 5}}>
                <h4>Announcements & News</h4>
                </Col>
                <Col>
                    <span>{!announcementAnnimation ? null : <Lottie onClick={()=>{setLoop(1)}} loop={loop} onLoopComplete = { ()=> (setLoop(false))} style={{height:32}} animationData={announcementAnnimation}/>}</span>
                </Col> 
            </Row></div>} />
            <div className="microsoft announcement-container">
                <body className="marquee">
                    {announcements.map(({ title, description, documentId, createdAt }) => (<AnnouncementModal{...{ title, description, documentId, createdAt }}></AnnouncementModal>))}
                </body>
            </div>
        </Card>
    </>)
}