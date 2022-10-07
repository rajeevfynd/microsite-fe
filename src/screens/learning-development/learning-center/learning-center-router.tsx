import * as React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

export const LearningCenterRouter = () => {
  return (
    <>
        <Routes>
            <Route path='/lnd-hero/*' element={<h1>Hero</h1>}></Route>
            <Route path='/skill/*' element={<h1>Skill</h1>}></Route>
            <Route path='/role/*' element={<h1>Skill</h1>}></Route>
            <Route path='/academy/*' element={<h1>Skill</h1>}></Route>
            <Route path='*' element={<Navigate replace to="/lnd/learning-center/lnd-hero"/>} ></Route>
        </Routes>
    </>
  )
}
