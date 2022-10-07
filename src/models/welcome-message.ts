export type WelcomeMessageDetailsType = {
    details ?: WelcomeMessageDetails
    onComplete : any
    onFileUrlUpdate : any
}
export type WelcomeMessageDetails = {
    fileUrl ?: string;
    isCompleted ?: Boolean
}