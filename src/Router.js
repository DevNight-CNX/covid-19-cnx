import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Map from './pages/Map';
import Login from './pages/Login';
import Landing from './pages/Landing';
import CreateReport from './pages/Report/Create';
import FullReport from './pages/Report/Full';
import DetailReport from './pages/Report/Detail';

const Router = () => {
  return (
    <Switch>
      <Route path="/submit" component={CreateReport} />
      <Route path="/report/:id" component={DetailReport} />
      <Route path="/report" component={FullReport} />
      <Route path="/map" component={Map} />
      <Route path="/login" component={Login} />
      <Route path="/" component={Landing} />
    </Switch>
  );
};

export default Router;
