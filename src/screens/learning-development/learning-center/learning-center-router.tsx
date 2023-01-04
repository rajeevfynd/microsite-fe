import * as React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { AddCourse } from './add-course';
import { AddRole } from './add-role';
import { AddSkill } from './add-skill';
import { LearningBy } from './learning-by-tags';
import { LndHero } from './lnd-hero'


export const LearningCenterRouter = () => {
    return (
        <>
            <Routes>
                <Route path='/lnd-hero/*' element={<LndHero></LndHero>}></Route>
                <Route path='/:tag' element={<LearningBy />} />
                <Route path='/addSkill' element={<AddSkill></AddSkill>}></Route>
                <Route path='/addRole' element={<AddRole></AddRole>}></Route>
                <Route path='/addCourse' element={<AddCourse></AddCourse>}></Route>
                <Route path='*' element={<Navigate replace to="/lnd/learning-center/lnd-hero" />} ></Route>
            </Routes>
        </>
    )
}
