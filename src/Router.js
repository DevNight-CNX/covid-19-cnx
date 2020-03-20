import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Landing from './pages/Landing';
import CreateReport from './pages/Report/Create';
import FullReport from './pages/Report/Full';
import DetailReport from './pages/Report/Detail';
import Home from './pages/Home';
import Map from './pages/Example/pages/Map';

const Router = () => {
  return (
    <Switch>
      <Route path="/submit" component={CreateReport} />
      <Route path="/report/:id" component={DetailReport} />
      <Route path="/report" component={FullReport} />
      <Route path="/map" component={Map} />
      <Route path="/login" component={Login} />
      <Route path="/home" component={Home} />
      <Route path="/" component={Landing} />
    </Switch>
  );
};

export default Router;
