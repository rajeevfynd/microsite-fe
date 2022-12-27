import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import * as React from 'react'
import { announcementType } from '../../../../models/announcementType';
import { getAnnouncement } from '../../../../service/announcment-service';
import AnnouncementModal from './announcement-modal';
import './index.css'


export const Announcement = () => {
    const [announcements, setAnnouncements] = React.useState<announcementType[]>([])
    const [marqueeStyle, setMarqueeStyle] = React.useState('')

    const fetchAnncouncement = React.useCallback(async () => {
        let response = await getAnnouncement();
        const announcement_list: announcementType[] = response.data
        setAnnouncements(announcement_list)
        let screens = announcement_list.length/3 + 1
        setMarqueeStyle(`.marquee {
            text-align: left;
            position: relative;
            box-sizing: border-box;
            animation: marquee ${screens*3}s linear infinite;
        }
        
        @keyframes marquee {
            0% {
                top: 9em
            }
        
            100% {
                top: -${screens*9}em
            }
        }`)
    }, [])
    React.useEffect(() => {
        fetchAnncouncement()
    }, [fetchAnncouncement])

    return (<>
    <style>
        {marqueeStyle}
    </style>
        <Card className="home-card" >
            <Meta title={<div style={{ paddingBottom: '10px' }}><h4>Announcements & News</h4></div>} />
            <div className="microsoft announcement-container">
                <body className="marquee">
                    {announcements.map(({ title, description, documentId, createdAt }) => (<AnnouncementModal{...{ title, description, documentId, createdAt }}></AnnouncementModal>))}
                </body>
            </div>
        </Card>
    </>)
}