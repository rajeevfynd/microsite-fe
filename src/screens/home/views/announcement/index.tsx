import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import * as React from 'react'
import { announcementType } from '../../../../models/announcementType';
import { getAnnouncement } from '../../../../service/announcment-service';
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
        <Card className="home-card">
            <Meta title={<div style={{ paddingBottom: '10px' }}><h4>Announcements & News</h4></div>} />
            <div className="microsoft container">
                <body className="marquee">
                    {announcements.map(({ title, description, documentId, createdAt }) => (<AnnouncementModal{...{ title, description, documentId, createdAt }}></AnnouncementModal>))}
                </body>
            </div>
        </Card>
    </>)
}