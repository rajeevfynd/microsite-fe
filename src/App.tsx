import * as React from "react";
import {BrowserRouter as Router} from 'react-router-dom'
import BaseRouter from "./routes";

function App() {
    return (
        <div>
            <Router>
                <BaseRouter/>
            </Router>
        </div>
    )
  }

export default App