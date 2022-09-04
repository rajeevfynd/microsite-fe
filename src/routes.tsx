import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Test from './components/test';

const BaseRouter = () => {
    return(
    <div>
        {/* Here the routes to various screens are added */}
        <Routes>
            <Route path="/" element= {<Test/>} >
            </Route>
        </Routes>
        
    </div>
    )
}

export default BaseRouter;