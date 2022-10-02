import * as React from "react";
import * as ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import App from "./App";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    <CookiesProvider>
        <App />
    </CookiesProvider>,
    document.getElementById('root'));