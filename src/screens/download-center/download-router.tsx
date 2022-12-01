import * as React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DownloadPolicies, DownloadsLogo, DownloadTemplates, LeadersGallery, NewEmployeeDownloads } from './views/download-center'

export const DownloadRouter = () => {
  return (
    <>
        <Routes>
            <Route path='/new-employees/*' element={<NewEmployeeDownloads />}></Route> 
            <Route path='/templates/*' element={<DownloadTemplates />}></Route>
            <Route path='/leaders-gallery/*' element={<LeadersGallery />}></Route>
            <Route path='/logo/*' element={<DownloadsLogo />}></Route>
            <Route path='/policies/*' element={<DownloadPolicies />}></Route>
            <Route path='*' element={<Navigate replace to="/frequently-used-policies/*"/>} ></Route>
        </Routes>
    </>
  )
}
