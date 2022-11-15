import { Flow } from "../models/enums/flow";
import { ProgressStatus } from "../models/enums/progress-status";
import { CourseMapType, ProgramMapType, ProgramType } from "../models/journey-details";
import httpInstance from "../utility/http-client";
import { arrayMove } from "react-sortable-hoc";

let debounceTimer:any;

export function getJourneys(key:string = '', page:string = '0', size:string = '8'){
    return httpInstance.get('/microsite/lnd/journeys/search?key='+key.toString()+'&page='+page.toString()+'&size='+size)
}

export const getJourneyDetails = (id:string) => {
    return httpInstance.get('/microsite/lnd/journeys/details/'+id)
}

export const debounce = (callback:any, time:any) => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(callback, time);
};

export const processPrograms = (programs: ProgramType[], flow: string) => {
    if (programs && programs.length > 0) {
      const progress = Math.round(programs.filter(program => program.status == 'COMPLETED').length * 100 / programs.length);
      let flowKey = flow as keyof typeof Flow;
      if (Flow[flowKey] == Flow.SEQUENCE)
        programs.every(program => {
          program.isActive = true;
          let enumKey = program.status as keyof typeof ProgressStatus;
          if (ProgressStatus[enumKey] != ProgressStatus.COMPLETED) {
            return false;
          }
          return true;
        })
        
      return {
        programs: programs,
        progress: progress
      };
    }
}

export const sortEndHandler = (index: {oldIndex:any, newIndex:any} ,programs: ProgramMapType[]) =>{
  let arr = arrayMove(programs, index.oldIndex, index.newIndex)
    for (let i=0; i< arr.length; i++){
      arr[i].index = i
    }
    return [...arr];
}

export const courseSortEndHandler = (index: {oldIndex:any, newIndex:any} ,programs: CourseMapType[]) =>{
  let arr = arrayMove(programs, index.oldIndex, index.newIndex)
    for (let i=0; i< arr.length; i++){
      arr[i].index = i
    }
    return [...arr];
}

export const removeProgramHadler = (index: number, programs: ProgramMapType[]) =>{
  let updatedPrograms = [...programs]
    updatedPrograms.splice(index,1)
    updatedPrograms.forEach((program,index) => {
      program.index = index
    })
    return [...updatedPrograms]
}

export const removeCourseHandler = (index: number, courses: CourseMapType[]) =>{
  let updatedCourses = [...courses]
    updatedCourses.splice(index,1)
    updatedCourses.forEach((course,index) => {
      course.index = index
    })
    return [...updatedCourses]
}

export const onSelectHandler = (index: number, e:any, programs: ProgramMapType[]) =>{
  let updatedPrograms = programs;
    let updatedProgram = programs[index];
    updatedProgram.programName = e.text;
    updatedProgram.program = e.key;
    updatedPrograms.splice(index,1,updatedProgram)
    return [...updatedPrograms]
}

export const onCourseSelectHandler = (index: number, e:any, courses: CourseMapType[]) =>{
  console.log(e)
  let updatedCourses = courses;
    let updatedCourse = courses[index];
    updatedCourse.course = e.key;
    updatedCourse.courseName = e.text;
    updatedCourses.splice(index,1,updatedCourse)
    return [...updatedCourses]
}

export const handleFormSubmit = (journey:any, programs: ProgramMapType[], thumbnail: string, category: string, id:string= null) => {
    let mappedPrograms:any[] = programs.filter(p => p.programName != undefined)
    mappedPrograms.forEach( (program,index) => {
      program.programPosition = index+1
    })
    return id==null ? setJourney({
      thumbnailId: thumbnail,
      title: journey.title.trim(),
      description: journey.description ? journey.description.trim() : journey.description,
      flow: journey.sequence ? Flow.SEQUENCE : Flow.NON_SEQUENCE,
      category: category,
      programs: [...mappedPrograms]
    }) :
    updateJourney({
      thumbnailId: thumbnail,
      title: journey.title.trim(),
      description: journey.description ? journey.description.trim() : journey.description,
      flow: journey.sequence ? Flow.SEQUENCE : Flow.NON_SEQUENCE,
      category: category,
      programs: [...mappedPrograms]
    },id)
}

export const handleProgramFormSubmit = (program:any, courses: CourseMapType[], thumbnail: string, id:string= null) => {
    console.log(program)
    let mappedCourses:any[] = courses.filter(p => p.courseName != undefined)
    mappedCourses.forEach( (course,index) => {
      course.coursePosition = index+1
    })
    return id==null ? setProgram({
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
    },id)
}

export const setJourney = (body: any) =>{
  console.log('set',body)
  const url = "/microsite/lnd/journeys/new"
  return httpInstance.post(url, body)
}

export const setProgram = (body: any) =>{
  console.log(body)
  const url = "/microsite/lnd/programs/new"
  return httpInstance.post(url, body)
}

export const updateJourney = (body:any, id:string) =>{
  console.log('update',body)
  const url = "/microsite/lnd/journeys/edit/"+id
  return httpInstance.post(url, body)
}

export const updateProgram = (body:any, id:string) =>{
  console.log('update',body)
  const url = "/microsite/lnd/programs/edit/"+id
  return httpInstance.post(url, body)
}