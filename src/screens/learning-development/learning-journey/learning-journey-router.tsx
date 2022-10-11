import * as React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { NewJourney } from './views/new-journey'
import { JourneyDetailView } from './views/journey-detail-view'
import { LearningJourneyList } from './views/learning-journey-list'

export const LearningJourneyRouter = () => {
  return (
    <>
        <Routes>
            <Route path='' element={<LearningJourneyList/>}></Route>
            <Route path='/new' element={<NewJourney/>}></Route>
            <Route path='/:id' element={<JourneyDetailView />}></Route>
        </Routes>
    </>
  )
}
