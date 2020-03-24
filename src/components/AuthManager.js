import React, { useContext, useEffect, useState, createContext } from 'react';
import jwt from 'jsonwebtoken';
import { FirebaseContext } from '../App';
import { AuthRouter } from './Auth';
import { setToken, removeToken } from 'services/auth/token';

const AuthFirebase = createContext();

export const useWithUser = () => {
  const { userId } = useContext(AuthFirebase);

  return {
    userId
  };
};

const AuthManager = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
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
            const decoded = jwt.decode(idToken, { complete: true });
            setUserId(decoded.payload.user_id);
          });
      } else {
        removeToken();
      }
    });
  });

  return (
    <AuthFirebase.Provider value={{ userId }}>
      <AuthRouter isAuth={isLoggedIn} isVerifying={false}>
        {children}
      </AuthRouter>
    </AuthFirebase.Provider>
  );
};

export default AuthManager;
