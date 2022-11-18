import { DownloadOptions } from "./enums/download-center-options";

export type DownloadDocumentType = {
    id: number
    name: string;
    description: string;
    department: string;
    documentId: number;
    updatedAt: string;
    docThumbnail: string
}


export type DownloadListPropsType = {
    title : DownloadOptions;
    url : string; 
}