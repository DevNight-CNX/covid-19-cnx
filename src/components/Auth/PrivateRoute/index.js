import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from '../AuthRouter';
import checkUserAgainstRoutePermission from '../utils/checkUserAgainstRoutePermission';
import getKickToPathFrom from '../utils/getKickToPathFrom';

const PrivateRoutePropTypes = {
  path: PropTypes.string,
  kickTo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  authorizes: PropTypes.array
};

function PrivateRoute({
  path,
  kickTo,
  authorizes: requiredAuthorizes,
  ...passProps
}) {
  return (
    <Consumer>
      {authRouter => {
        if (!kickTo && !authRouter.privateKickTo) {
          throw new Error(
            'You need to provide "kickTo" prop for PrivateRoute or "privateKickTo" for AuthRouter'
          );
        }
        return (
          <Route
            exact={passProps.exact}
            path={path}
            render={() => {
              const permission = checkUserAgainstRoutePermission(
                requiredAuthorizes,
                authRouter
              );

              const { isValid } = permission;
              if (!isValid) {
                return (
                  <Redirect
                    to={getKickToPathFrom(
                      authRouter.privateKickTo,
                      kickTo,
                      permission
                    )}
                  />
                );
              }
              return <Route {...passProps} />;
            }}
          />
        );
      }}
    </Consumer>
  );
}

PrivateRoute.propTypes = PrivateRoutePropTypes;

export default PrivateRoute;
