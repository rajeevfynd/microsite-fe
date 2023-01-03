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


export type EditPolicyDocumentType = {
    key : number,
    documentId : number,
    thumbnail : string,
    title: string,
    description : string,
    category : number
}


export type AddDocumentPropsType = {
    departmentOptionsList : SelectProps['options'];
    onFinish : any;
}


export type EditDocumentsPropsType = {
    downloadUrl : string;
    departmentOptionsList : SelectProps['options'];
    departmentList : DepartmentType[];
    onFinish : any;
    documentDetails : DownloadDocumentType
}

export type EditLeadersPropsType = {
    downloadUrl : string;
    onFinish : any;
    documentDetails : LeadersDownloadType
}

export type EditPolicyPropsType = {
    categoryList : SubmenuTabsType[]
    downloadUrl : string;
    onFinish : any;
    documentDetails : EditPolicyDocumentType
}

export type SubmenuTabsType = {
    key : string;
    value : string;
}