import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../App';
import { AuthRouter } from './Auth';
import { setToken, removeToken } from 'services/auth/token';

const AuthManager = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(function(idToken) {
            setIsLoggedIn(true);
            setToken(idToken);
          });
      } else {
        removeToken();
      }
    });
  });

  return (
    <AuthRouter isAuth={isLoggedIn} isVerifying={false}>
      {children}
    </AuthRouter>
  );
};

export default AuthManager;
