import * as React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { LndHero } from './lnd-hero'
import { RoleCourses } from './role-courses'
import { SkillCourses } from './skill-courses/intex'


export const LearningCenterRouter = () => {
  return (
    <>
        <Routes>
            <Route path='/lnd-hero/*' element={<LndHero></LndHero>}></Route>
            <Route path='/skill-courses/*' element={<SkillCourses></SkillCourses>}></Route>
            <Route path='/role-courses/*' element={<RoleCourses></RoleCourses>}></Route>
            <Route path='/academy/*' element={<h1>Skill</h1>}></Route>
            <Route path='*' element={<Navigate replace to="/lnd/lerning-center/lnd-hero"/>} ></Route>
        </Routes>
    </>
  )
}
