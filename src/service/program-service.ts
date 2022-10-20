import { DOWNLOAD_URL, EDIT_CAROUSEL, GET_CAROUSEL } from "../constants/urls"
import { carouselFormtype } from "../models/carousel-form-type"
import httpInstance from "../utility/http-client"

export const getPrograms = (url: string) => {
    return httpInstance.get(url)
}

// export const addPrograms = (body: any) => {
//     const url = "/microsite/program/add-program"
//     return httpInstance.post(url,body);
// }

// export const uploadImage = (body: any) => {
//     return httpInstance.post(UPLOAD_IMG,body);
// }

export const editCarouselSlide = (body: any) => {
    return httpInstance.post(EDIT_CAROUSEL, body)
}

export const getCarouselData = () => {
    return httpInstance.get(GET_CAROUSEL)
}

export const getCarouselImageData = (d: carouselFormtype) =>{
    return httpInstance.get(DOWNLOAD_URL+d.imageDocumentId)
}