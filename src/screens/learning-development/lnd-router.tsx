import * as React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { LearningCenter } from './learning-center'
import { LearningJourney } from './learning-journey'
import { LearningPassport } from './learning-passport'
import { NewEmployeeCenter } from './new-employee-center'

export const LndRouter = () => {
  return (
    <>
        <Routes>
            <Route path='/new-emp-center/*' element={<NewEmployeeCenter></NewEmployeeCenter>}></Route>
            <Route path='/learning-center/*' element={<LearningCenter></LearningCenter>}></Route>
            <Route path='/learning-passport/*' element={<LearningPassport></LearningPassport>}></Route>
            <Route path='/learning-journey/*' element={<LearningJourney></LearningJourney>}></Route>
            <Route path='*' element={<Navigate replace to="/lnd/learning-center/*"/>} ></Route>
        </Routes>
    </>
  )
}
