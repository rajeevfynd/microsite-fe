import * as React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Induction } from './induction'
import { NewEmployeeFAQ } from './new-emp-faq'
import { Survey30Days } from './survey-30-days'


export const NewEmployeeRouter = () => {
  return (
    <>
        <Routes>
            <Route path='/induction' element={<Induction></Induction>}></Route>
            <Route path='/new-emp-survey' element={<Survey30Days></Survey30Days>}></Route>
            <Route path='/new-emp-faq' element={<NewEmployeeFAQ></NewEmployeeFAQ>}></Route>
            <Route path='*' element={<Navigate replace to="/lnd/new-emp-center/induction"/>} ></Route>
        </Routes>
    </>
  )
}
