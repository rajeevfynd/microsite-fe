import {DELETE_DOWNLOAD_CENTER_DOCUMENT, EDIT_DOWNLOAD_CENTER_DOCUMENT, GET_DOWNLOADS_DEPARTMENT_URL, GET_NEW_EMPLOYEE_DOWNLOADS, GET_HR_POLICIES, GET_LEADERS_DOWNLOADS } from "../constants/urls"
import httpInstance from "../utility/http-client"

export const getDownloadsList = (departmentId : number = 0, key : string = "", offset: string = '0', size: string = '7') => {

    if(key != "")
        return httpInstance.get(GET_NEW_EMPLOYEE_DOWNLOADS + "/search?key=" + key + "&offset=" + offset.toString() + "&pageSize=" + size)
    
    else if (departmentId)
        return httpInstance.get(GET_NEW_EMPLOYEE_DOWNLOADS +  "?departmentId=" + departmentId + "&offset=" + offset.toString() + "&pageSize=" + size)
    
    return httpInstance.get(GET_NEW_EMPLOYEE_DOWNLOADS + "?offset=" + offset.toString() + "&pageSize=" + size)
}

export const getDepartmentList = () => {

    return httpInstance.get(GET_DOWNLOADS_DEPARTMENT_URL)

}


export const deleteDocument = (id : number) => {

    return httpInstance.put(DELETE_DOWNLOAD_CENTER_DOCUMENT + id, {})

}



export const getDocumentsList = (url : string, key : string = "", offset: string = '0', size: string = '7') => {
    if(key != "")
        return httpInstance.get(url.substring(0, url.lastIndexOf("/")) + "/search?key=" + key + "&offset=" + offset.toString() + "&pageSize=" + size)
    return httpInstance.get(url + "?offset=" + offset.toString() + "&pageSize=" + size)
}

export const getLeadersDownloads = (url : string, offset: string = '0', size: string = '7') => {
    return httpInstance.get(url + "?offset=" + offset.toString() + "&pageSize=" + size)
}

export const deleteDownloads = (url : string, id : string) => {
    return httpInstance.put(url + id, {})
}

export const addLeadersDownload = (body : any) => {
    return httpInstance.post(GET_LEADERS_DOWNLOADS + "/add", body)
}

export const addDownloadDocument = (url : string, body : any) => {
    return httpInstance.post(url + "/add", body)
}

export const editDownloadDocument = (url : string, id : number, body : any) => {
    return httpInstance.put(url + "/edit/" + id, body)
}