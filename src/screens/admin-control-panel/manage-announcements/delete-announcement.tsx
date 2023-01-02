import { DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Card } from 'antd';
import * as React from 'react'
import { announcementType } from '../../../models/announcementType';
import { deleteAnnouncementService, getAnnouncement } from '../../../service/home-service';
import { AnnouncementThumbnail } from './announcement-thumbnail';

export const DeleteAnnouncement = (props: any) => {
    const [announcements, setAnnouncements] = React.useState<announcementType[]>([])
    const [loadagain, setloadagain] = React.useState()

    const fetchAnncouncement = React.useCallback(async () => {
        let response = await getAnnouncement();
        const announcement_list: announcementType[] = response.data
        setAnnouncements(announcement_list)
    }, [])
    React.useEffect(() => {
        fetchAnncouncement()
    }, [props, loadagain, fetchAnncouncement])

    const deleteAnnouncement = async (id: any) => {
        let resp = await deleteAnnouncementService(id);
        fetchAnncouncement
        setloadagain(id)
    }


    return (
        <>
            <div>
                {announcements && announcements.length > 0 && announcements.map(announcement => (
                    <div key={announcement.id}>
                        <Card title={announcement.title} extra={<Button type='text' icon={<DeleteOutlined />} onClick={() => { deleteAnnouncement(announcement.id) }}> </Button>}>
                            {announcement.description}
                            {announcement.documentId && <AnnouncementThumbnail {...{ announcement }} />}

                        </Card>
                    </div>
                ))}
            </div>
        </>
    )
}