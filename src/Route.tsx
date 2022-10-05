import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './screens/landing-page'


export const GlobalRouter = () => {

  return (
    <>
      <Routes>
        <Route path='*' element={<LandingPage></LandingPage>}></Route>
      </Routes>
    </>
  )
}
