import React, { useContext, useEffect } from 'react';
import { fetchPost } from 'utils/services/fetch';
import { FirebaseContext } from '../App';

const FcmManager = ({ children }) => {
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    if (firebase.messaging.isSupported()) {
      const messaging = firebase.messaging();
    }
  }, []);

  return <div>{children}</div>;
};

export default FcmManager;
