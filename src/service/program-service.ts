import { message } from "antd"
import { DOWNLOAD_URL, EDIT_CAROUSEL, GET_CAROUSEL } from "../constants/urls"
import { carouselFormtype } from "../models/carousel-form-type"
import { Flow } from "../models/enums/flow"
import { ProgressStatus } from "../models/enums/progress-status"
import { CourseMapType, ProgramType } from "../models/journey-details"
import httpInstance from "../utility/http-client"

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

export const getCourseById = (d: string) =>{
    return httpInstance.get('/microsite/course?id='+d)
}

export function getPrograms(key:string = '', page:string = '0', size:string = '8'){
    return httpInstance.get('/microsite/lnd/programs/search?key='+key.toString()+'&page='+page.toString()+'&size='+size)
}

export function getCourses(key:string = '', page:string = '0', size:string = '8'){
    return httpInstance.get('/microsite/lnd/programs/course-search?key='+key.toString()+'&page='+page.toString()+'&size='+size)
}

export function getCoursesFts(key:string = '', page:string = '0', size:string = '8'){
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
    return {
      courses: courses,
      progress: 0
    }
}

export function validateProgramsCourses(values: CourseMapType[]) {
  if(!(values.filter(c => c.course == null).length == 0)) {
    message.error('Empty course field cannot be mapped to a program')
    return false
  }
  let cids = values.map( v => v.course?.toString() )
  if(new Set(cids).size != cids.length) {
    message.error('Program should not have duplicate courses')
    return false
  }
  return true
  }


  export const deleteProgram = (id: string) => {
    const url = "/microsite/lnd/programs/"+id;
    return httpInstance.delete(url);
  }

  export const removeCourseHandler = (index: number, courses: CourseMapType[]) => {
    let updatedCourses = [...courses]
    updatedCourses.splice(index, 1)
    return [...updatedCourses]
  }

  export const onCourseSelectHandler = (index: number, e: any, courses: CourseMapType[]) => {
    let updatedCourses = courses;
    let updatedCourse = courses[index];
    updatedCourse.course = e.key;
    updatedCourse.courseName = e.text;
    updatedCourses.splice(index, 1, updatedCourse)
    return [...updatedCourses]
  }

  export const handleProgramFormSubmit = (program: any, courses: CourseMapType[], thumbnail: string, id: string = null) => {
  if(validateProgramsCourses(courses)){
  let mappedCourses: any[] = courses.filter(p => p.courseName != undefined)
  mappedCourses.forEach((course, index) => {
    course.coursePosition = index + 1
  })
  return id == null ? setProgram({
    thumbnailId: thumbnail,
    title: program.title.trim(),
    description: program.description ? program.description.trim() : program.description,
    flow: program.sequence ? Flow.SEQUENCE : Flow.NON_SEQUENCE,
    issueCertificate: program.issueCertificate,
    courses: [...mappedCourses]
  }) :
    updateProgram({
      thumbnailId: thumbnail,
      title: program.title.trim(),
      description: program.description ? program.description.trim() : program.description,
      flow: program.sequence ? Flow.SEQUENCE : Flow.NON_SEQUENCE,
      issueCertificate: program.issueCertificate,
      courses: [...mappedCourses]
    }, id)
  }
}

export const setProgram = (body: any) => {
    const url = "/microsite/lnd/programs/new"
    return httpInstance.post(url, body)
  }

export const updateProgram = (body: any, id: string) => {
    const url = "/microsite/lnd/programs/edit/" + id
    return httpInstance.post(url, body)
  }