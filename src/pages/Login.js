import React, { useContext, useEffect } from 'react';
import * as firebase from 'firebase/app';
import { fetchGet } from 'utils/services/fetch';
import { FirebaseContext } from '../App';

const Login = () => {
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log('on start', user);
      firebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
          fetchGet(
            'https://us-central1-covid-19-cnx.cloudfunctions.net/authen',
            null,
            {
              token: idToken,
              isAuth: true
            }
          );
        });
      // if (user) {
      //   setIsLoggedIn(true);
      // } else {
      //   history.push('/login');
      //   setIsLoggedIn(false);
      // }
    });
  }, []);

  console.log('firebase', firebase);

  const onButtonClick = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        const token = result.credential.accessToken;

        console.log('on login', result);
      })
      .catch(function(error) {
        console.log('error', error);
      });
  };

  return <button onClick={onButtonClick}>Facebook login</button>;
};

export default Login;
