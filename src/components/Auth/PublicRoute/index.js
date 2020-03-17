import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from '../AuthRouter';

const PublicRoutePropTypes = {
  path: PropTypes.string,
  kickTo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  authorizes: PropTypes.array
};

function PublicRoute({
  path,
  kickTo,
  authorizes: requiredAuthorizes,
  ...passProps
}) {
  return (
    <Consumer>
      {authRouter => {
        if (!kickTo && !authRouter.publicKickTo) {
          throw new Error(
            'You need to provide "kickTo" prop for PublicRoute or "publicKickTo" for AuthRouter'
          );
        }
        return (
          <Route
            exact={passProps.exact}
            path={path}
            render={() => {
              if (authRouter.isAuth) {
                return <Redirect to={kickTo || authRouter.publicKickTo} />;
              }
              return <Route {...passProps} />;
            }}
          />
        );
      }}
    </Consumer>
  );
}

PublicRoute.propTypes = PublicRoutePropTypes;

export default PublicRoute;
