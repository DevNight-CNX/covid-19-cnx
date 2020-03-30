import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import useResponsive from 'utils/useResponsive';
import CreateReport from './pages/Report/Create';
import FullReport from './pages/Report/Full';
import DetailReport from './pages/Report/Detail';
import SituationNews from './pages/News';
import Policy from './pages/Policy';
import Home from './pages/Home';
import DesktopPage from './pages/DesktopDashboard';
import Graph from 'pages/graph';

const Router = () => {
  const history = useHistory();

  const { isDesktop } = useResponsive(matches => {
    if (matches) {
      history.push('/');
    }
  });

  if (!isDesktop) {
    return (
      <Switch>
        <Route path="/submit" component={CreateReport} />
        <Route path="/policy" component={Policy} />
        <Route path="/report/:id" component={DetailReport} />
        <Route path="/report" component={FullReport} />
        <Route path="/news" component={SituationNews} />
        <Route path="/" component={Home} />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/graph" component={Graph} />
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
