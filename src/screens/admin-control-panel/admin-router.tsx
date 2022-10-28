import * as React from 'react'
import EditCarousal from './edit-carousel'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminInduction } from './induction'
import { AdminJourneyList } from './journeys'
import { AdminProgramList } from './programs'

export const AdminRouter = () => {
  return (
    <>
        <Routes>
            <Route path='/edit-carousel/*' element={<EditCarousal></EditCarousal>}></Route> 
            <Route path='/induction/*' element={<AdminInduction />}></Route>
            <Route path='/journeys/*' element={<AdminJourneyList />}></Route>
            <Route path='/journeys/new' element={<>Create journey</>} />
            <Route path='/journeys/:id' element={<>Journey edit</>} />
            <Route path='/programs/*' element={<AdminProgramList />}></Route>
            <Route path='/programs/new' element={<>create program</>}></Route>
            <Route path='/programs/:id' element={<>program edit</>}></Route>
            <Route path='*' element={<Navigate replace to="/induction/*"/>} ></Route>
        </Routes>
    </>
  )
}
