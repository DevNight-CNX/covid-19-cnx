import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import env from 'utils/env';

ReactGA.initialize(env.get('GA_TRACKING_ID'));
export const withGaTracker = (WrappedComponent, options = {}) => {
  const trackPage = page => {
    ReactGA.set({
      page,
      ...options
    });
    ReactGA.pageview(page);
  };

  const HOC = ({ location, ...rest }) => {
    useEffect(() => {
      const { pathname, search } = location;
      trackPage(pathname + search);
    }, [location]);

    return <WrappedComponent location={location} {...rest} />;
  };
  HOC.propTypes = {
    location: PropTypes.object.isRequired
  };

  if (env.isServerProduction()) {
    return HOC;
  }

  return WrappedComponent;
};
