import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import env from 'utils/env';

const LogRocketTracking = () => {
  if (!env.isServerLocalhost()) {
    LogRocket.init('ivz2af/covid-19-cnx');
    setupLogRocketReact(LogRocket);
  }
  return null;
};

export default LogRocketTracking;
