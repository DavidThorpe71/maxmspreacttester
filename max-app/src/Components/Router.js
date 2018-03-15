import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FrontPage from './FrontPage';
import App from './App';
import NotFound from './NotFound';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={FrontPage} />
            <Route path="/user/:userId" component={App}/>
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>
)

export default Router;