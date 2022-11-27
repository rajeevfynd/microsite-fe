import { SelectProps } from "antd";
import { DownloadOptions } from "./enums/download-center-options";

export type DownloadDocumentType = {
    id: number
    name: string;
    description: string;
    department: string;
    documentId: number;
    updatedAt: string;
    docThumbnail: string
    downloadCategoryId: number
}


export type DownloadListPropsType = {
    title : DownloadOptions;
    url : string; 
}


export type AddDocumentPropsType = {
    departmentOptionsList : SelectProps['options'];
    downloadCategoryList : SelectProps['options'];
    onFinish : any;
}


export type EditDocumentsPropsType = {
    departmentOptionsList : SelectProps['options'];
    departmentList : string[]
    onFinish : any;
    documentDetails : DownloadDocumentType
}