import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useFirestore from 'utils/useFirestore';

const ScreeningPointContext = createContext();

const ScreeningPointProvider = ScreeningPointContext.Provider;

const useScreeningPoint = () => {
  const context = useContext(ScreeningPointContext);
  if (context === undefined) {
    throw new Error(
      'useScreeningPoint must be used within a ScreeningPointProvider'
    );
  }
  return context;
};

const ScreeningPointPropTypes = {
  children: PropTypes.node
};

const ScreeningPoint = ({ children }) => {
  const { data: screeningPoints, loading } = useFirestore(db =>
    db.collection('check_points')
  );

  return (
    <ScreeningPointProvider
      value={{
        screeningPoints,
        screeningPointsLoading: loading
      }}
    >
      {children}
    </ScreeningPointProvider>
  );
};

ScreeningPoint.propTypes = ScreeningPointPropTypes;

export { ScreeningPoint, useScreeningPoint };
