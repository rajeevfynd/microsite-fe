import * as React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AdminControlPanel } from '../admin-control-panel'
import { Home } from '../home'
import { LND } from '../learning-development'
import { RNR } from '../rnr'

export const MenuRouter = () => {
  return (
    <>
        <Routes>
            <Route path='/home/*' element={<Home></Home>}></Route>
            <Route path='/lnd/*' element={<LND></LND>}></Route>
            <Route path='/rnr/*' element={<RNR></RNR>}></Route>
            <Route path='/admin/*' element={<AdminControlPanel></AdminControlPanel>}></Route>
            <Route path='*' element={<Navigate replace to="/home"/>} ></Route>
        </Routes>
    </>
  )
}
