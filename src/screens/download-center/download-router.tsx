import * as React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LeadersGallery } from './views/leaders-gallery'
import { NewEmployeeDownloads } from './views/new-employee-downloads'

export const DownloadRouter = () => {
  return (
    <>
        <Routes>
            <Route path='/new-employees/*' element={<NewEmployeeDownloads />}></Route> 
            <Route path='/templates/*' element={<>Templates</>}></Route>
            <Route path='/leaders-gallery/*' element={<LeadersGallery />}></Route>
            <Route path='/logo/*' element={<>Logo</>} />
            <Route path='/frequently-used-policies/*' element={<>Policies</>} />
            <Route path='*' element={<Navigate replace to="/frequently-used-policies/*"/>} ></Route>
        </Routes>
    </>
  )
}
