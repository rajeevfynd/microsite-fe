import { Flow } from "../models/enums/flow";
import { ProgressStatus } from "../models/enums/progress-status";
import { ProgramType } from "../models/journey-details";
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