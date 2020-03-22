import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './pages/Login';
import Landing from './pages/Landing';
import CreateReport from './pages/Report/Create';
import FullReport from './pages/Report/Full';
import DetailReport from './pages/Report/Detail';
import Policy from './pages/Policy';
import Home from './pages/Home';
import Map from './pages/Example/pages/Map';
import Like from './pages/Example/pages/Like';
import DesktopPage from './pages/DesktopDashboard';
import { useMediaQuery } from 'react-responsive';

const Router = () => {
  const history = useHistory();
  const isDesktop = useMediaQuery(
    {
      query: '(min-width: 1100px)'
    },
    undefined,
    matches => {
      if (matches) {
        history.push('/home');
      }
    }
  );

  if (!isDesktop) {
    return (
      <Switch>
        <Route path="/submit" component={CreateReport} />
        <Route path="/policy" component={Policy} />
        <Route path="/like" component={Like} />
        <Route path="/report/:id" component={DetailReport} />
        <Route path="/report" component={FullReport} />
        <Route path="/map" component={Map} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/" component={Landing} />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/home" component={DesktopPage} />
        <Route path="/policy" component={Policy} />
        <Route path="/" component={Landing} />
      </Switch>
    );
  }
};

export default Router;
