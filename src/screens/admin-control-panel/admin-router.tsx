import * as React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminInduction } from './induction'
import { AdminJourneyList } from './journeys'

export const AdminRouter = () => {
  return (
    <>
    <Routes>
            <Route path='/induction/*' element={<AdminInduction />}></Route>
            <Route path='/journeys' element={<AdminJourneyList />}></Route>
            <Route path='/journeys/new' element={<>Create journey</>} />
            <Route path='/journeys/:id' element={<>Journey edit</>} />
            <Route path='/programs/*' element={<>programs</>}></Route>
            <Route path='*' element={<Navigate replace to="/induction/*"/>} ></Route>
        </Routes>
    </>
  )
}
