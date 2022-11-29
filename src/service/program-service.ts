import { DOWNLOAD_URL, EDIT_CAROUSEL, GET_CAROUSEL } from "../constants/urls"
import { carouselFormtype } from "../models/carousel-form-type"
import { Flow } from "../models/enums/flow"
import { ProgressStatus } from "../models/enums/progress-status"
import { ProgramType } from "../models/journey-details"
import httpInstance from "../utility/http-client"

let debounceTimer:any;

export const getUserPrograms = (url: string) => {
    return httpInstance.get(url)
}

// export const addPrograms = (body: any) => {
//     const url = "/microsite/lnd/programs/add-program"
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

export const getCarouselCourse = (d: carouselFormtype) =>{
    return httpInstance.get('/microsite/course?id='+d.courseHyperlink)
}

export function getPrograms(key:string = '', page:string = '0', size:string = '8'){
    return httpInstance.get('/microsite/lnd/programs/search?key='+key.toString()+'&page='+page.toString()+'&size='+size)
}

export function getCourses(key:string = '', page:string = '0', size:string = '8'){
    return httpInstance.get('/microsite/lnd/programs/course-search?key='+key.toString()+'&page='+page.toString()+'&size='+size)
}

export function getCoursesFts(key:string = '', page:string = '0', size:string = '3'){
    return httpInstance.get('/microsite/course/search?keyword='+key.toString()+'&offset='+page.toString()+'&pageSize='+size)
}

export const getProgramDetails = (id:string) => {
    return httpInstance.get('/microsite/lnd/programs/details/'+id)
}

export const processCourses = (courses: ProgramType[], flow: string) => {
    if (courses && courses.length > 0) {
      const progress = Math.round(courses.filter(course => course.status == 'COMPLETED').length * 100 / courses.length);
      if (flow == Flow.SEQUENCE)
        courses.every(course => {
          course.isActive = true;
          let enumKey = course.status as keyof typeof ProgressStatus;
          if (ProgressStatus[enumKey] != ProgressStatus.COMPLETED) {
            return false;
          }
          return true;
        })
        
      return {
        courses: courses,
        progress: progress
      };
    }
}

export const debounce = (callback:any, time:any) => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(callback, time);
};