import { compose, curry } from 'ramda';
import warning from 'warning';

const get = envName => {
  const envValue = process.env[`REACT_APP_${envName}`];
  warning(
    typeof envValue !== 'undefined',
    `there's no "REACT_APP_${envName}" environment`
  );
  return envValue;
};

const getServer = () => get('SERVER') || 'localhost';
const checkServer = curry((checkedServer, server) => server === checkedServer);

const isServerLocalhost = compose(
  checkServer('localhost'),
  getServer
);
const isServerDev = compose(
  checkServer('development'),
  getServer
);
const isServerStaging = compose(
  checkServer('staging'),
  getServer
);
const isServerProduction = compose(
  checkServer('production'),
  getServer
);

const getAPIUrl = () => get('API_URL');

export default {
  get,
  isServerLocalhost,
  isServerDev,
  isServerStaging,
  isServerProduction,
  getAPIUrl,
  getServer
};
