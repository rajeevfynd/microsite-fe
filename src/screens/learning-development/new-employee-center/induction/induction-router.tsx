import * as React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Welcome } from './views/welcome'

export const InductionRouter = () => {
  return (
    <>
        <Routes>
            <Route path='/welcome' element={<Welcome></Welcome>}></Route>
            <Route path='*' element={<Navigate replace to="/lnd/new-emp-center/induction/welcome"/>}></Route>
        </Routes>
    </>
  )
}
