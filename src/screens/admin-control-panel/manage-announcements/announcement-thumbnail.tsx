import * as React from 'react'
import { getAnnouncementThumb } from '../../../service/announcment-service';

export const AnnouncementThumbnail =(props:any)=>{

    const [thumb,setThumb] = React.useState();
    const getAnnThumb = React.useCallback(async () =>{
        let resp = await getAnnouncementThumb(props.announcement);
        setThumb(resp.data)
    },[])
    React.useEffect(()=>{
        getAnnThumb()
    },[thumb,getAnnThumb])

    return (
        <>
            <div>
                <img src={`data:image/png;base64,${thumb}`} ></img>
            </div>
        </>
    )

}