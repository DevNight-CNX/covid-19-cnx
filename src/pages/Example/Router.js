import React from 'react';
import PropTypes from 'prop-types';
import routeUrlProvider, {
  EXAMPLE_TODO_LIST,
  EXAMPLE_COUNTER,
  EXAMPLE_GITHUB_USER_LIST,
  EXAMPLE_FINAL_FORM
} from 'constants/route-paths';
import { Route } from 'react-router-dom';
import Counter from './pages/Counter';
import UserList from './pages/UserList';
import Todo from './pages/Todo';
import FinalForm from './pages/FinalForm';
import Example from './index';

const RouterPropTypes = {
  match: PropTypes.object
};

const Router = ({ match }) => {
  return (
    <>
      <Route exact path={`${match.path}`} component={Example} />
      <Route
        exact
        path={`${match.path}${routeUrlProvider.getForRoute(EXAMPLE_TODO_LIST)}`}
        component={Todo}
      />
      <Route
        exact
        path={`${match.path}${routeUrlProvider.getForRoute(
          EXAMPLE_GITHUB_USER_LIST
        )}`}
        component={UserList}
      />
      <Route
        exact
        path={`${match.path}${routeUrlProvider.getForRoute(EXAMPLE_COUNTER)}`}
        component={Counter}
      />
      <Route
        exact
        path={`${match.path}${routeUrlProvider.getForRoute(
          EXAMPLE_FINAL_FORM
        )}`}
        component={FinalForm}
      />
    </>
  );
};

Router.propTypes = RouterPropTypes;

export default Router;
