export type WelcomeMessageDetailsType = {
    details : WelcomeMessageDetails
    onComplete : any
}
export type AdminWelcomeMessageDetailsType = {
    details : WelcomeMessageDetails
    onFileUrlUpdate : any
}
export type WelcomeMessageDetails = {
    fileUrl : string;
    isCompleted : boolean
}