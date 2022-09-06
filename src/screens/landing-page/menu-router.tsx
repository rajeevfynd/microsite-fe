import * as React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { LND } from '../learning-development'
import { RNR } from '../rnr'

export const MenuRouter = () => {
  return (
    <>
        <Routes>
            <Route path='/lnd/*' element={<LND></LND>}></Route>
            <Route path='/rnr/*' element={<RNR></RNR>}></Route>
            <Route path='*' element={<Navigate replace to="/lnd/*"/>} ></Route>
        </Routes>
    </>
  )
}
