import React from 'react';
import PropTypes from 'prop-types';
import DynamicComponent from './DynamicComponent';

const Typography = ({ ...rest }) => {
  return <DynamicComponent {...rest} />;
};

Typography.propTypes = {
  variant: PropTypes.oneOf([
    '',
    'headline',
    'title',
    'subtitle',
    'content',
    'button',
    'buttonlink',
    'body',
    'bodyHighlight',
    'bodyLarge',
    'bodyLargeHighlight',
    'bodySmall',
    'bodySmallHighlight',
    'caption',
    'captionHighlight',
    'link',
    'field'
  ]),
  tag: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'div',
    'span',
    'p'
  ]),
  weight: PropTypes.oneOf(['', 'normal', 'bold', '400', '700']),
  alignItems: PropTypes.string,
  justifiContent: PropTypes.string
};
Typography.defaultProps = {
  variant: '',
  tag: 'div',
  weight: '',
  alignItems: '',
  justifiContent: ''
};
export default Typography;
