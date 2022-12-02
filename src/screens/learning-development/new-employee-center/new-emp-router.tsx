import * as React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Induction } from './induction'
import { NewEmployeeFAQ } from './new-emp-faq'
import { NewEmployeeSurvey } from './new-emp-survey'


export const NewEmployeeRouter = () => {
  return (
    <>
        <Routes>
            <Route path='/induction/*' element={<Induction></Induction>}></Route>
            <Route path='/new-emp-survey' element={<NewEmployeeSurvey></NewEmployeeSurvey>}></Route>
            <Route path='/new-emp-faq' element={<NewEmployeeFAQ></NewEmployeeFAQ>}></Route>
            <Route path='*' element={<Navigate replace to="/lnd/new-emp-center/induction/*"/>} ></Route>
        </Routes>
    </>
  )
}
