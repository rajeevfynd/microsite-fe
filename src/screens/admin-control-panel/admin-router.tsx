import * as React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import EditCarousal from './edit-carousel'


export const AdminRouter = () => {
  return (
    <>
        <Routes>
            <Route path='/induction/*' element={<>induction</>}></Route>
            <Route path='/programs/*' element={<>programs</>}></Route>
            <Route path='/journeys/*' element={<>journeys</>}></Route>
            <Route path='/edit-carousel/*' element={<EditCarousal></EditCarousal>}></Route> 
            <Route path='*' element={<Navigate replace to="/induction/*"/>} ></Route>
        </Routes>
    </>
  )
}
