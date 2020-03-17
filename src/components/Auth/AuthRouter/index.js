import React from 'react';
import PropTypes from 'prop-types';

export const { Provider, Consumer } = React.createContext();

const AuthRouterPropTypes = {
  children: PropTypes.any,
  isAuth: PropTypes.bool,
  privateKickTo: PropTypes.string,
  publicKickTo: PropTypes.string,
  authorizes: PropTypes.array,
  isVerifying: PropTypes.bool
};

function AuthRouter({
  children,
  isAuth = false,
  privateKickTo,
  publicKickTo,
  authorizes = [],
  isVerifying = false
}) {
  return (
    <Provider
      value={{
        isAuth,
        privateKickTo,
        publicKickTo,
        authorizes,
        isVerifying
      }}
    >
      {!isVerifying && children}
    </Provider>
  );
}

AuthRouter.propTypes = AuthRouterPropTypes;

export default AuthRouter;
