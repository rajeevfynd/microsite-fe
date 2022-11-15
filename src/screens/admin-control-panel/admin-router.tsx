import * as React from 'react'
import EditCarousal from './edit-carousel'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminInduction } from './induction'
import { AdminJourneyList } from './journeys'
import { AdminProgramList } from './programs'
import { NewProgram } from './programs/views/new-program'
import { NewJourney } from './journeys/views/new-jounrey'
import { EditJourney } from './journeys/views/edit-journey'
import { EditProgram } from './programs/views/edit-program'

export const AdminRouter = () => {
  return (
    <>
        <Routes>
            <Route path='/edit-carousel/*' element={<EditCarousal></EditCarousal>}></Route> 
            <Route path='/induction/*' element={<AdminInduction />}></Route>
            <Route path='/journeys/*' element={<AdminJourneyList />}></Route>
            <Route path='/journeys/new' element={<NewJourney />} />
            <Route path='/journeys/:id' element={<EditJourney />} />
            <Route path='/programs/*' element={<AdminProgramList />}></Route>
            <Route path='/programs/new' element={<NewProgram />}></Route>
            <Route path='/programs/:id' element={<EditProgram />}></Route>
            <Route path='*' element={<Navigate replace to="/induction/*"/>} ></Route>
        </Routes>
    </>
  )
}
