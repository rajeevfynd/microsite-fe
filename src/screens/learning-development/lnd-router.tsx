import * as React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { LearningCenter } from './learning-center'
import { JourneyDetailView } from './learning-journey/views/journey-detail-view'
import { LearningPassport } from './learning-passport'
import { NewEmployeeCenter } from './new-employee-center'
import { ProgramDetailsView } from './programs'

export const LndRouter = () => {
  return (
    <>
        <Routes>
            <Route path='/new-emp-center/*' element={<NewEmployeeCenter></NewEmployeeCenter>}></Route>
            <Route path='/learning-center/*' element={<LearningCenter></LearningCenter>}></Route>
            <Route path='/learning-passport/*' element={<LearningPassport></LearningPassport>}></Route>
            <Route path='learning-journey/:id' element={<JourneyDetailView />}></Route>
            <Route path='/programs/:id' element={<ProgramDetailsView />} />
            <Route path='*' element={<Navigate replace to="/lnd/learning-center/*"/>} ></Route>
        </Routes>
    </>
  )
}
