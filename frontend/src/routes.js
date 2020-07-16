import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Events from './pages/Events';
import Users from './pages/Users';
import Logon from './pages/Logon';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/home" component={Home} />
                <Route path="/user" component={Users} />
                <Route path="/event" component={Events} />
            </Switch>
        </BrowserRouter>
    )
}
