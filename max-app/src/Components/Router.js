import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FrontPage from './FrontPage';
import App from './App';
import UserPage from './UserPage';
import NotFound from './NotFound';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/user/:userId" component={UserPage}/>
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>
)

export default Router;