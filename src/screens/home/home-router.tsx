import * as React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from './views'



export const HomeRouter = (props: any) => {
  return (
    <>
        <Routes>
            <Route path='/*' element={<HomePage></HomePage>}></Route>
        </Routes>
    </>
  )
}