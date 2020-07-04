import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';


// can also make function and export in same line like below comment.
// export default function Routes(){

const Routes = () => {
    return(
        //this is how we do Route, see test learnreact Route in
        //testfrontend.
        <BrowserRouter>
        <Switch>
            {/* this Home is inside core > Home.js*/}
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/signin" exact component={Signin} />
        </Switch>
        </BrowserRouter>
    );
}

// exporting our Routes function, so that to use it somewhere else.
export default Routes;