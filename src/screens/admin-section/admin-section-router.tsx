import * as React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import EditCarousal from './edit-carousel'

export const AdminRouter = () => {
  return (
    <>
        <Routes>
            <Route path='/edit-carousel/*' element={<EditCarousal></EditCarousal>}></Route> 
            <Route path='*' element={<Navigate replace to="/admin/edit-carousel/*"/>} ></Route>
        </Routes>
    </>
  )
}