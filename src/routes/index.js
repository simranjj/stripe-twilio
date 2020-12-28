import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../components/login/Login';
import Verify from '../components/verify/Verify';
import Checkout from '../components/checkout/Checkout'
import Success from '../components/success/success'


const Routes = () => {
    return (
      <BrowserRouter >
      <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/verify" component={Verify} />
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/success" component={Success} />
      {/* <Route component={Profile} /> */}
      </Switch>
      </BrowserRouter>
    );
  };
  
  export default Routes;
  