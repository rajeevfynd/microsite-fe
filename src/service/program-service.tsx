import httpInstance from "../utility/http-client";

export function filterPrograms(key:string = ''){
    return httpInstance.get('/microsite/lnd/programs/search/rru-id?key='+key.toString())
}