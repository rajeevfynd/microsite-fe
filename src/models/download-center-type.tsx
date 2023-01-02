import { SelectProps } from "antd";

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

export type LeadersDownloadType = {
    id: number
    name: string;
    designation: string;
    description: string;
    document: DocumentType;
    updatedAt: string;
}

export type PolicyDownloadType = {
    id: number
    name: string;
    category: string;
    description: string;
    document: DocumentType;
    updatedAt: string;
}

export type DocumentType = {
    id : number;
    thumbnail : string
}

export type DepartmentType = {
    id : number;
    department : string;
}



export type AddDocumentPropsType = {
    departmentOptionsList : SelectProps['options'];
    onFinish : any;
}


export type EditDocumentsPropsType = {
    departmentOptionsList : SelectProps['options'];
    departmentList : DepartmentType[];
    onFinish : any;
    documentDetails : DownloadDocumentType
}

export type SubmenuTabsType = {
    key : string;
    value : string;
}