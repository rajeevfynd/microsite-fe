import * as React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DownloadPolicies, DownloadTemplates, NewEmployeeDownloads } from './views/download-center'
import { LeadersGallery } from './views/leaders-gallery'

export const DownloadRouter = () => {
  return (
    <>
        <Routes>
            <Route path='/new-employees/*' element={<NewEmployeeDownloads />}></Route> 
            <Route path='/templates/*' element={<DownloadTemplates />}></Route>
            <Route path='/leaders-gallery/*' element={<LeadersGallery />}></Route>
            <Route path='/logo/*' element={<>Logo</>} />
            <Route path='/policies/*' element={<DownloadPolicies />} />
            <Route path='*' element={<Navigate replace to="/frequently-used-policies/*"/>} ></Route>
        </Routes>
    </>
  )
}
