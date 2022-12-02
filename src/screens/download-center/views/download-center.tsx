import * as React from "react";
import { DownloadListPropsType } from "../../../models/download-center-type";
import { DownloadOptions } from "../../../models/enums/download-center-options";
import { DownloadsGallery } from "./downloads-gallery";
import { DownloadsList } from "./downloads-list";


const getDownloadsList = (title : DownloadOptions, categoryId : string) => {

    const downloadListProps : DownloadListPropsType = {
        title : title,
        categoryId : categoryId
    }

    return (
        <DownloadsList downloadListProps = {downloadListProps}/>
    )
}


const getDownloadsGallery = (title : DownloadOptions, categoryId : string) => {
    const downloadListProps : DownloadListPropsType = {
        title : title,
        categoryId : categoryId
    }

    return (
        <DownloadsGallery downloadListProps = {downloadListProps}/>
    )
}



export const NewEmployeeDownloads = () => {
    return (
        getDownloadsList(DownloadOptions.NEW_EMPLOYEE_DOWNLOADS, process.env.DOWNLOAD_CENTER_NEW_EMPLOYEES)
    )
}

export const DownloadTemplates = () => {
    return (
        getDownloadsList(DownloadOptions.TEMPLATES, process.env.DOWNLOAD_CENTER_TEMPLATES)
    )
}

export const DownloadPolicies = () => {
    return (
        getDownloadsList(DownloadOptions.POLICIES, process.env.DOWNLOAD_CENTER_LEADERS_GALLERY)
    )
}


export const LeadersGallery = () => {
    return (
        getDownloadsGallery(DownloadOptions.LEADERS_GALLERY, process.env.DOWNLOAD_CENTER_POLICIES)
    )
}

export const DownloadsLogo = () => {
    return (
        getDownloadsGallery(DownloadOptions.LOGO, process.env.DOWNLOAD_CENTER_LOGO)
    )
}