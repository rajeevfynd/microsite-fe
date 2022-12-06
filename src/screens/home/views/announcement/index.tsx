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
    const fetchAnncouncement = React.useCallback(async () => {
        let response = await getAnnouncement();
        const announcement_list: announcementType[] = response.data
        setAnnouncements(announcement_list)
    }, [])
    React.useEffect(() => {
        fetchAnncouncement()
    }, [fetchAnncouncement])

    return (<>
        <Card className="home-card">
        <Meta title={<div style={{ paddingBottom: '10px' }}>
                    <h4>
                        <Row>
                            <Col style={{marginTop: '10px'}}>
                                Announcements & News
                            </Col>
                            <Col>
                                <video width="40" height="40" preload="none" src="https://cdn-icons-mp4.flaticon.com/512/9121/9121628.mp4" autoPlay loop muted playsInline />
                            </Col>
                        </Row>
                    </h4>
                </div>} />
            <div className="microsoft announcement-container">
                <body className="marquee">
                    {announcements.map(({ title, description, documentId, createdAt }) => (<AnnouncementModal{...{ title, description, documentId, createdAt }}></AnnouncementModal>))}
                </body>
            </div>
        </Card>
    </>)
}