import * as firebase from 'firebase/app';
import 'firebase/analytics';

const eventTracker = ({ type, id }) => {
  console.log(type, '&', id);
  firebase.analytics().logEvent(type, id);
};

export default eventTracker;
