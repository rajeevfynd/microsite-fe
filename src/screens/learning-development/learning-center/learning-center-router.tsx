import * as React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { LearningBySkill } from './learning-by-skill';

export const LNDCenterRouter = () => {
    return (
        <>
            <Routes>
                <Route path='/skill' element={<LearningBySkill></LearningBySkill>}></Route>
                <Route path='*' element={<Navigate replace to="/lnd/learning-center/lnd-hero" />} ></Route>
            </Routes>
        </>
    )
}
