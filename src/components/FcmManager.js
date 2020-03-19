import React, { useContext, useEffect } from 'react';
import { fetchPost } from 'utils/services/fetch';
import { FirebaseContext } from '../App';

const FcmManager = ({ children }) => {
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    const messaging = firebase.messaging();

    messaging.onMessage(payload => {
      console.log('Message received. ', payload);
    });

    // messaging
    //   .getToken()
    //   .then(currentToken => {
    //     console.log('currentToken', currentToken);
    //     fetchPost(
    //       `https://iid.googleapis.com/iid/v1/${currentToken}/rel/topics/pattest`,
    //       null,
    //       {
    //         isAuth: true,
    //         token:''
    //       }
    //     );
    //   })
    //   .catch(console.log);
  }, []);

  return <div>{children}</div>;
};

export default FcmManager;
