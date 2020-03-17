import React from 'react';
import PropTypes from 'prop-types';

const makeField = Component => {
  const MakeFieldPropTypes = {
    input: PropTypes.object
  };
  const MakeFieldDefaultProps = {
    input: {}
  };

  const MakeField = ({ input, ...rest }) => {
    return <Component {...input} {...rest} />;
  };

  MakeField.propTypes = MakeFieldPropTypes;
  MakeField.defaultProps = MakeFieldDefaultProps;

  return MakeField;
};

export default makeField;
