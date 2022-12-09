import httpInstance from "../utility/http-client"

export const getLearningEvents = () => {
    const url = "/microsite/lnd/home/events"
    return httpInstance.get(url)
}