import { ADD_ANNOUNCEMENT, ANNOUNCEMENT_THUMB, DOWNLOAD_URL, GET_ANNOUNCEMENT } from "../constants/urls"
import { announcementType } from "../models/announcementType";
import httpInstance from "../utility/http-client"

export const getAnnouncement = () =>{
    return httpInstance.get(GET_ANNOUNCEMENT);
}
export const getAnnouncementDoc = (d: announcementType) =>{
    return httpInstance.get(DOWNLOAD_URL+d.documentId)
}

export const getAnnouncementThumb = (d: announcementType) =>{
    return httpInstance.get(ANNOUNCEMENT_THUMB+d.id)
}

export const addAnnouncement = (body: any) => {
    return httpInstance.post(ADD_ANNOUNCEMENT,body)
}
export const deleteAnnouncementService = (id: any) => {
    return httpInstance.delete(ADD_ANNOUNCEMENT+id)
}