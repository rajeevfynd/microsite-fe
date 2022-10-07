import httpInstance from "../utility/http-client"

export const setWelcomeMessageFileUrl = (body: any) =>{
    const url = "/microsite/lnd/user-welcome-message/file-url"
    return httpInstance.post(url, body)
}

export const setWelcomeMessageStatus = (body: any) =>{
    const url = "/microsite/lnd/user-welcome-message/status"
    return httpInstance.post(url, body)
}

export const getWelcomeMessageDetails = () => {
    const url = "/microsite/lnd/user-welcome-message/active"
    return httpInstance.get(url)
}

export const getActiveInductionJourney = () => {
    const inductionUrl = "/microsite/lnd/journeys/induction"
    return httpInstance.get(inductionUrl)
}