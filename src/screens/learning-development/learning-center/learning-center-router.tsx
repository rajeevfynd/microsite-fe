import * as React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { AddCourse } from './add-course';
import { AddRole } from './add-role';
import { AddSkill } from './add-skill';
import { LearningBySkill } from './learning-by-skill';

export const LNDCenterRouter = () => {
    return (
        <>
            <Routes>
                <Route path='/skill' element={<LearningBySkill></LearningBySkill>}></Route>
                <Route path='/addSkill' element={<AddSkill></AddSkill>}></Route>
                <Route path='/addRole' element={<AddRole></AddRole>}></Route>
                <Route path='/addCourse' element={<AddCourse></AddCourse>}></Route>

                {/* <Route path='*' element={<Navigate replace to="/lnd/learning-center/lnd-hero" />} ></Route> */}
            </Routes>
        </>
    )
}
