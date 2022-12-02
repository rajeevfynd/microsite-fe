import { ADD_DOWNLOAD_CENTER_DOCUMENT, DELETE_DOWNLOAD_CENTER_DOCUMENT, EDIT_DOWNLOAD_CENTER_DOCUMENT, GET_DOWNLOADS_DEPARTMENT_URL, GET_DOWNLOADS_LIST_URL } from "../constants/urls"
import httpInstance from "../utility/http-client"

export const getDownloadsList = (categoryId : string, departmentId : number = 0, key : string = "", offset: string = '0', size: string = '7') => {

    if(key != "")
        return httpInstance.get(GET_DOWNLOADS_LIST_URL + categoryId +  "/search?key=" + key + "&offset=" + offset.toString() + "&pageSize=" + size)
    
    else if (departmentId)
        return httpInstance.get(GET_DOWNLOADS_LIST_URL + categoryId +  "?departmentId=" + departmentId + "&offset=" + offset.toString() + "&pageSize=" + size)
    
    return httpInstance.get(GET_DOWNLOADS_LIST_URL + categoryId + "?offset=" + offset.toString() + "&pageSize=" + size)
}

export const getDepartmentList = () => {

    return httpInstance.get(GET_DOWNLOADS_DEPARTMENT_URL)

}


export const deleteDocument = (id : number) => {

    return httpInstance.put(DELETE_DOWNLOAD_CENTER_DOCUMENT + id, {})

}

export const addDocument = (body : any) => {

    return httpInstance.post(ADD_DOWNLOAD_CENTER_DOCUMENT, body)

}

export const editDocument = (id : number, body : any) => {

    return httpInstance.put(EDIT_DOWNLOAD_CENTER_DOCUMENT + id , body)

}