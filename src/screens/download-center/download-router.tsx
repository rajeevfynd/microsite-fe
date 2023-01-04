import * as React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DownloadsHome } from './views/downloads-home'
import { HRPolicies } from './views/hr-policies'
import { LeadersDownloads } from './views/leaders-downloads'
import { NewEmployeeDownloads } from './views/new-employee-downloads'
import { TemplatesDownload } from './views/templates'

export const DownloadRouter = () => {
  return (
    <>
        <Routes>
            <Route path='/home/*' element={<DownloadsHome />}></Route> 
            <Route path='/new-employees/*' element={<NewEmployeeDownloads />}></Route> 
            <Route path='/templates/*' element={<TemplatesDownload />}></Route>
            <Route path='/leaders-gallery/*' element={<LeadersDownloads />}></Route>
            <Route path='/policies/*' element={<HRPolicies />}></Route>
            <Route path='*' element={<Navigate replace to="/frequently-used-policies/*"/>} ></Route>
        </Routes>
    </>
  )
}
