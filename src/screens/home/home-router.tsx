import * as React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from './views'



export const HomeRouter = () => {
  return (
    <>
        <Routes>
            <Route path='/*' element={<HomePage></HomePage>}></Route>
            <Route path='*' element={<Navigate replace to="/home"/>} ></Route>
        </Routes>
    </>
  )
}