import * as React from "react";
import {BrowserRouter, Routes, Route, Link, useNavigate} from "react-router-dom" ;
import "antd/dist/antd.css";
import "./index.css";
import { GlobalRouter } from "./Route";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <GlobalRouter></GlobalRouter>
            </BrowserRouter>
        </>
    )
}
export default App;