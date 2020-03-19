import React, { useContext, useEffect } from 'react';
import { FirebaseContext } from '../App';
import { AuthRouter } from './Auth';

const AuthManager = ({ children }) => {
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log('on start', user);
      // firebase
      //   .auth()
      //   .currentUser.getIdToken(/* forceRefresh */ true)
      //   .then(function(idToken) {
      //     console.log('idToken', idToken);
      //   });
      // if (user) {
      //   setIsLoggedIn(true);
      // } else {
      //   history.push('/login');
      //   setIsLoggedIn(false);
      // }
    });
  });

  return <AuthRouter>{children}</AuthRouter>;
};

export default AuthManager;
