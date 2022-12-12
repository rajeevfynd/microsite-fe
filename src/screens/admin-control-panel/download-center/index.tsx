import { Tabs } from "antd";
import * as React from "react";
import { DownloadListPropsType } from "../../../models/download-center-type";
import { DownloadOptions } from "../../../models/enums/download-center-options";
import { AdminDownloadsGallery } from "./views/downloads-gallery";
import { DownloadsList } from "./views/downloads-list";



const getDownloadsList = (title: DownloadOptions, categoryId: string) => {

    const downloadListProps: DownloadListPropsType = {
        title: title,
        categoryId: categoryId
    }

    return (
        <DownloadsList downloadListProps={downloadListProps} />
    )
}


const getDownloadsGallery = (title: DownloadOptions, categoryId: string) => {
    const downloadListProps: DownloadListPropsType = {
        title: title,
        categoryId: categoryId
    }

    return (
        <AdminDownloadsGallery downloadListProps={downloadListProps} />
    )
}



export const AdminNewEmployeeDownloads = () => {
    return (
        getDownloadsList(DownloadOptions.NEW_EMPLOYEE_DOWNLOADS, process.env.DOWNLOAD_CENTER_NEW_EMPLOYEES)
    )
}

export const AdminDownloadTemplates = () => {
    return (
        getDownloadsList(DownloadOptions.TEMPLATES, process.env.DOWNLOAD_CENTER_TEMPLATES)
    )
}

export const AdminDownloadPolicies = () => {
    return (
        getDownloadsList(DownloadOptions.POLICIES, process.env.DOWNLOAD_CENTER_LEADERS_GALLERY)
    )
}


export const AdminLeadersGallery = () => {
    return (
        getDownloadsGallery(DownloadOptions.LEADERS_GALLERY, process.env.DOWNLOAD_CENTER_POLICIES)
    )
}

export const AdminDownloadsLogo = () => {
    return (
        getDownloadsGallery(DownloadOptions.LOGO, process.env.DOWNLOAD_CENTER_LOGO)
    )
}

const items = [
    {
        label: `New Employee`,
        key: 'new-employee',
        children: <AdminNewEmployeeDownloads />,
    },
    {
        label: `Templates`,
        key: 'templates',
        children: <AdminDownloadTemplates />,
    },{
        label: `Policies`,
        key: 'policies',
        children: <AdminDownloadPolicies />,
    },{
        label: `Leader's Gallery`,
        key: 'leader-gallery',
        children: <AdminLeadersGallery />,
    },{
        label: `Logo`,
        key: 'downloads-logo',
        children: <AdminDownloadsLogo />,
    }
];

export const DownloadTabs = () => {
    return (
        <div className="card-container">
            <Tabs items={items} />
        </div>
    )
}