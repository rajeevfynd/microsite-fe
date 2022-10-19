import * as React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminInduction } from './induction'

export const AdminRouter = () => {
  return (
    <>
    <Routes>
            <Route path='/induction/*' element={<AdminInduction />}></Route>
            <Route path='/programs/*' element={<>programs</>}></Route>
            <Route path='/journeys/*' element={<>journeys</>}></Route>
            <Route path='*' element={<Navigate replace to="/induction/*"/>} ></Route>
        </Routes>
    </>
  )
}
