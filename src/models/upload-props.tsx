export interface UploadOnDoneParams {
    documentId: string
    thumbnailUrl: string
}

export interface UploadonRemoveParams {

}

export type UploadProps = {
    onRemove?: (info: UploadonRemoveParams) => void,
    onDone?: (info: UploadOnDoneParams) => void;
    file?: string
}