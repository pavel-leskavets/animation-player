import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LandingPageComponent from './Components/LandingPage/LandingPageComponent';
import { BrowserRouter, Route } from 'react-router-dom';
ReactDOM.render(
    <BrowserRouter>
        <Route exact path="/" component={LandingPageComponent} />
        <Route exact path="/main" component={App} />
    </BrowserRouter>,
    document.getElementById('root')
);
