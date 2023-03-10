import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./Global"
import AppWrapper from './AppWrapper';
import { HashRouter } from 'react-router-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'prismjs/themes/prism-coy.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
ReactDOM.render(
    <HashRouter>
        <AppWrapper></AppWrapper>
    </HashRouter>,
    document.getElementById('root')
);

//serviceWorker.unregister();
