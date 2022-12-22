import * as React from 'react'
import { getAnnouncementThumb } from '../../../service/home-service';
import { formatBase64 } from '../../../utility/image-utils';

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
                <img src={formatBase64(thumb)} ></img>
            </div>
        </>
    )

}