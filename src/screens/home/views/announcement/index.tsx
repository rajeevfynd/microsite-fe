import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import * as React from 'react'
import { announcementType } from '../../../../models/announcementType';
import { getAnnouncement } from '../../../../service/home-service';
import AnnouncementModal from './announcement-modal';
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
        <Card className="home-card" >
            <Meta title={<div style={{ paddingBottom: '10px' }}><h4>Announcements & News <video width="30" height="30" preload="none" src="https://cdn-icons-mp4.flaticon.com/512/6416/6416398.mp4" autoPlay loop={true} muted={true} playsInline></video></h4></div>} />
            <div className="microsoft announcement-container">
                <body className="marquee">
                    {announcements.map(({ title, description, documentId, createdAt }) => (<AnnouncementModal{...{ title, description, documentId, createdAt }}></AnnouncementModal>))}
                </body>
            </div>
        </Card>
    </>)
}