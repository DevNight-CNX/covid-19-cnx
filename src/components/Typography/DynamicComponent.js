import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { has } from 'lodash';

const StyledDynamicComponent = styled.div`
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifiContent }) => justifiContent};
  display: flex;

  ${({ variant, theme }) => {
    if (has(theme.typography, variant)) {
      return theme.typography[variant];
    }
  }}
  ${({ weight }) =>
    weight &&
    css`
      font-weight: ${weight};
    `}
`;
const DynamicComponent = ({ tag, children, ...rest }) => {
  const WithComponent = StyledDynamicComponent.withComponent(tag);
  return <WithComponent {...rest}>{children}</WithComponent>;
};
DynamicComponent.propTypes = {
  tag: PropTypes.string,
  component: PropTypes.string,
  children: PropTypes.node,
  weight: PropTypes.string
};
DynamicComponent.defaultProps = {
  variant: '',
  tag: '',
  children: null,
  weight: '',
  alignItems: 'center',
  justifiContent: 'normal'
};
export default DynamicComponent;
