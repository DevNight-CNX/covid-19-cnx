import React from 'react';
import getDisplayName from 'utils/getDisplayName';
import AuthGet from '../AuthGet';

const withAuth = WrappedComponent => {
  const WithAuth = props => (
    <AuthGet
      render={({ isAuth, isVerifying, authorizes }) => (
        <WrappedComponent
          {...props}
          isAuth={isAuth}
          isAuthVerifying={isVerifying}
          authorizes={authorizes}
        />
      )}
    />
  );

  WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return WithAuth;
};

export default withAuth;
