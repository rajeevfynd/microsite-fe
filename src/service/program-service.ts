import httpInstance from "../utility/http-client"

export function getPrograms(key:string = '', page:string = '0', size:string = '8'){
    return httpInstance.get('/microsite/lnd/journeys/search?key='+key.toString()+'&page='+page.toString()+'&size='+size)
}