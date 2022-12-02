export interface UploadOnDoneParams {
    documentId: string
    file: string
}

export interface UploadonRemoveParams {

}

export type UploadProps = {
    onRemove?: (info: UploadonRemoveParams) => void,
    onDone?: (info: UploadOnDoneParams) => void;
    file?: string
}