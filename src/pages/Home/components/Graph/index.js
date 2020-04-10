import React from 'react';
import PropTypes from 'prop-types';

import ChiangMaiGraph from './ChangMaiGraph';
import ThaiGraph from './ThaiGraph';

const Graph = ({ isFilterInChiangmai = false }) => {
  return isFilterInChiangmai ? <ChiangMaiGraph /> : <ThaiGraph />;
};

Graph.propTypes = { isFilterInChiangmai: PropTypes.bool };

export default Graph;
