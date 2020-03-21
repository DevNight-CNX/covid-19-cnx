import { useContext } from 'react';
import { AuthContext } from './Auth/AuthRouter';
import { FirebaseContext } from '../App';

const useFirebaseAuthen = () => {
  const { isAuth } = useContext(AuthContext);
  const firebase = useContext(FirebaseContext);

  const login = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  const authentication = () => {
    if (!isAuth) {
      login();
      return false;
    } else {
      return true;
    }
  };

  return {
    authentication
  };
};

export default useFirebaseAuthen;
