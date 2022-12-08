import { ADD_ANNOUNCEMENT, ANNOUNCEMENT_THUMB, DOWNLOAD_URL, GET_ALL_BIRTHDAYS, GET_ANNOUNCEMENT, GET_BIRTHDAYS } from "../constants/urls"
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

export const getBirthdaysService = ()=>{
    return httpInstance.get(GET_BIRTHDAYS);
}

export const getAllBirthdaysService = ()=>{
    return httpInstance.get(GET_ALL_BIRTHDAYS);
}

export const addBirthday = (body: any) =>{
    return httpInstance.post(GET_BIRTHDAYS,body);
}