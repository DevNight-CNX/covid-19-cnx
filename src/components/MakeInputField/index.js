import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './index.view';

const MakeInputFieldPropTypes = {
  Component: PropTypes.node.isRequired,
  input: PropTypes.object
};
const MakeInputFieldDefaultProps = {
  Component: null,
  input: {}
};
const MakeInputField = ({ Component, input, ...rest }) => {
  return (
    <Wrapper>
      <Component {...rest} />
    </Wrapper>
  );
};
MakeInputField.propTypes = MakeInputFieldPropTypes;
MakeInputField.defaultProps = MakeInputFieldDefaultProps;
export default MakeInputField;
