import * as React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Induction } from './views/induction'
import { Welcome } from './views/welcome'

export const InductionRouter = () => {
  return (
    <>
        <Routes>
            <Route path='/welcome' element={<Induction />}></Route>
            <Route path='*' element={<Navigate replace to="/lnd/new-emp-center/induction"/>}></Route>
        </Routes>
    </>
  )
}
