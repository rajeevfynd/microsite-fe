import * as React from "react";
import { GET_DOWNLOAD_POLICIES_URL, GET_DOWNLOAD_TEMPLATES_URL, GET_LEADERS_GALLERY_URL, GET_NEW_EMPLOYEE_DOWNLOADS_URL } from "../../../constants/urls";
import { DownloadListPropsType } from "../../../models/download-center-type";
import { DownloadOptions } from "../../../models/enums/download-center-options";
import { DownloadsList } from "./views/downloads-list";


const getDownloadsList = (title : DownloadOptions, url : string) => {

    const downloadListProps : DownloadListPropsType = {
        title : title,
        url : url
    }

    return (
        <DownloadsList downloadListProps = {downloadListProps}/>
    )
}


export const NewEmployeeDownloads = () => {
    return (
        getDownloadsList(DownloadOptions.NEW_EMPLOYEE_DOWNLOADS, GET_NEW_EMPLOYEE_DOWNLOADS_URL)
    )
}

export const DownloadTemplates = () => {
    return (
        getDownloadsList(DownloadOptions.TEMPLATES, GET_DOWNLOAD_TEMPLATES_URL)
    )
}

export const DownloadPolicies = () => {
    return (
        getDownloadsList(DownloadOptions.POLICIES, GET_DOWNLOAD_POLICIES_URL)
    )
}