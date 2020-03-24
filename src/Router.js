import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import CreateReport from './pages/Report/Create';
import FullReport from './pages/Report/Full';
import DetailReport from './pages/Report/Detail';
import Policy from './pages/Policy';
import Home from './pages/Home';
import DesktopPage from './pages/DesktopDashboard';

const Router = () => {
  const history = useHistory();
  const isDesktop = useMediaQuery(
    {
      query: '(min-width: 1100px)'
    },
    undefined,
    matches => {
      if (matches) {
        history.push('/');
      }
    }
  );

  if (!isDesktop) {
    return (
      <Switch>
        <Route path="/submit" component={CreateReport} />
        <Route path="/policy" component={Policy} />
        <Route path="/report/:id" component={DetailReport} />
        <Route path="/report" component={FullReport} />
        <Route path="/" component={Home} />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/policy" component={Policy} />
        <Route
          path={['/', '/submit', '/report/:id', '/report']}
          component={DesktopPage}
        />
      </Switch>
    );
  }
};

export default Router;
