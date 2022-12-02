import { message } from "antd";
import { Flow } from "../models/enums/flow";
import { ProgressStatus } from "../models/enums/progress-status";
import { CourseMapType, ProgramMapType, ProgramType } from "../models/journey-details";
import httpInstance from "../utility/http-client";

let debounceTimer: any;

export function getJourneys(key: string = '', page: string = '0', size: string = '8') {
  return httpInstance.get('/microsite/lnd/journeys/search?key=' + key.toString() + '&page=' + page.toString() + '&size=' + size)
}

export const getJourneyDetails = (id: string) => {
  return httpInstance.get('/microsite/lnd/journeys/details/' + id)
}

export const debounce = (callback: any, time: any) => {
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

// export const sortEndHandler = (oldIndex: any, newIndex: any, programs: ProgramMapType[]) => {
//   let arr = arrayMove(programs, oldIndex, newIndex)
//   for (let i = 0; i < arr.length; i++) {
//     arr[i].index = i
//   }
//   return [...arr];
// }

// export const courseSortEndHandler = (index: {oldIndex:any, newIndex:any} ,programs: CourseMapType[]) =>{
//   let arr = arrayMove(programs, index.oldIndex, index.newIndex)
//     for (let i=0; i< arr.length; i++){
//       arr[i].index = i
//     }
//     return [...arr];
// }

export const removeProgramHadler = (index: number, programs: ProgramMapType[]) => {
  let updatedPrograms = [...programs]
  updatedPrograms.splice(index, 1)
  return [...updatedPrograms]
}

export const removeCourseHandler = (index: number, courses: CourseMapType[]) => {
  let updatedCourses = [...courses]
  updatedCourses.splice(index, 1)
  return [...updatedCourses]
}

export const onSelectHandler = (index: number, e: any, programs: ProgramMapType[]) => {
  let updatedPrograms = [...programs];
  let updatedProgram : ProgramMapType = {
    programName : e.text,
    program : e.key
  }
  updatedPrograms.splice(index, 1, updatedProgram)
  console.log(index,e,programs,updatedPrograms)
  return [...updatedPrograms]
}

export const onCourseSelectHandler = (index: number, e: any, courses: CourseMapType[]) => {
  console.log(e)
  let updatedCourses = courses;
  let updatedCourse = courses[index];
  updatedCourse.course = e.key;
  updatedCourse.courseName = e.text;
  updatedCourses.splice(index, 1, updatedCourse)
  return [...updatedCourses]
}

export const handleFormSubmit = (journey: any, programs: ProgramMapType[], thumbnail: string, category: string, id: string = null) => {
  if(validateJourneyPrograms(programs)) {
  let mappedPrograms: any[] = programs.filter(p => p.programName != undefined)
  mappedPrograms.forEach((program, index) => {
    program.programPosition = index + 1
  })
  return id == null ? setJourney({
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
    }, id)
  }
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

export const setJourney = (body: any) => {
  console.log('set', body)
  const url = "/microsite/lnd/journeys/new"
  return httpInstance.post(url, body)
}

export const setProgram = (body: any) => {
  console.log(body)
  const url = "/microsite/lnd/programs/new"
  return httpInstance.post(url, body)
}

export const updateJourney = (body: any, id: string) => {
  console.log('update', body)
  const url = "/microsite/lnd/journeys/edit/" + id
  return httpInstance.post(url, body)
}

export const updateProgram = (body: any, id: string) => {
  console.log('update', body)
  const url = "/microsite/lnd/programs/edit/" + id
  return httpInstance.post(url, body)
}

export const deleteJourney = (id: string) => {
  const url = "/microsite/lnd/journeys/"+id;
  return httpInstance.delete(url);
}

export const deleteProgram = (id: string) => {
  const url = "/microsite/lnd/programs/"+id;
  return httpInstance.delete(url);
}

export function validateJourneyPrograms(values: ProgramMapType[]) {
  let hasDuplicate = false;

  if(values.length == 0) {
    message.error('Journey should be mapped with atleast one program')
    return false
  }
  values.map(v => v.program).sort().sort(
    (a:string, b:string) => {
      if (a == b) { hasDuplicate = true; return 1
    };
  }
  )
  console.log('hasDuplicate', hasDuplicate)
  if(hasDuplicate) {
    message.error('Journey should not have duplicate programs')
    return false
  }
  if(!(values.filter(p => p.program == null).length == 0)) {
    message.error('Empty program field cannot be mapped to a journey')
    return false
  }
  return true
}

export function validateProgramsCourses(values: CourseMapType[]) {
  let hasDuplicate = false;
  values.map(v => v.course).sort().sort(
    (a:string, b:string) => {
      if (a == b) { hasDuplicate = true; return 1
    };
  }
  )
  
  console.log('hasDuplicate', hasDuplicate)
  if(hasDuplicate) {
    message.error('Program should not have duplicate courses')
    return false
  }
  if(!(values.filter(p => p.course == null).length == 0)) {
    message.error('Empty course field cannot be mapped to a program')
    return false
  }
  return true
}