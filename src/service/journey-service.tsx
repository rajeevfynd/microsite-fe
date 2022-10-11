import { arrayMove } from "react-sortable-hoc";
import { Flow } from "../models/enums/flow";
import { ProgressStatus } from "../models/enums/progress-status";
import { ProgramType } from "../models/journey-details";
import { ProgramMapType } from "../models/program-map-type";
import httpInstance from "../utility/http-client";

let debounceTimer:any;

export function getMoreJourneys(key:string = '', page:string = '1', size:string = '8'){
    return httpInstance.get('/microsite/lnd/journeys/search?key='+key.toString()+'&page='+page.toString()+'&size='+size)
}

export function filterJourneys(key:string = '', page:string='1', size:string = '8'){
    return httpInstance.get('/microsite/lnd/journeys/search?key='+key.toString()+'&page='+'&size=8')
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

export const setJourney = (body: any) =>{
  const url = "/microsite/lnd/journeys/new"
  return httpInstance.post(url, body)
}

export const sortEndHandler = (index: {oldIndex:any, newIndex:any} ,programs: ProgramMapType[]) =>{
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

export const onSelectHandler = (index: number, e:any, programs: ProgramMapType[]) =>{
  let updatedPrograms = programs;
    let updatedProgram = programs[index];
    updatedProgram.rruProgramID = e;
    updatedPrograms.splice(index,1,updatedProgram)
    return [...updatedPrograms]
}

export const handleFormSubmit = (values:any, programs: ProgramMapType[]) => {
  let journey = values.journey
    let mappedPrograms:any[] = programs.filter(p => p.rruProgramID != undefined)
    mappedPrograms.forEach( (program,index) => program.position = index+1)
    return setJourney({
      thumbnailLink: journey.thumbnailLink,
      id: undefined,
      title: journey.title,
      description: journey.description,
      category: journey.category,
      flow: journey.sequencial ? Flow.SEQUENCE : Flow.NON_SEQUENCE,
      programs: [...mappedPrograms]
    })
}