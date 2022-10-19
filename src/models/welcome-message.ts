export type WelcomeMessageDetailsType = {
    details ?: WelcomeMessageDetails
    onComplete : any
}
export type WelcomeMessageDetails = {
    fileUrl ?: string;
    isCompleted ?: boolean
}