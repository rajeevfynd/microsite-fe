import { SelectProps } from "antd";
import { DownloadOptions } from "./enums/download-center-options";

export type DownloadDocumentType = {
    id: number
    name: string;
    description: string;
    department: number[];
    document: DocumentType;
    updatedAt: string;
    docThumbnail: string
    downloadCategoryId: number
}

export type DocumentType = {
    id : number;
    thumbnail : string
}

export type DepartmentType = {
    id : number;
    department : string;
}


export type DownloadListPropsType = {
    title : DownloadOptions;
    categoryId : string; 
}


export type AddDocumentPropsType = {
    departmentOptionsList : SelectProps['options'];
    downloadCategoryList : SelectProps['options'];
    downloadCategoryId : string
    onFinish : any;
}


export type EditDocumentsPropsType = {
    departmentOptionsList : SelectProps['options'];
    departmentList : DepartmentType[];
    onFinish : any;
    documentDetails : DownloadDocumentType
}