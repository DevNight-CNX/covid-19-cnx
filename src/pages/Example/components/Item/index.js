import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'components/Link';

const Title = styled.h3`
  ${({ theme }) => theme.typography.bodyLargeHighlight()}
  color: ${({ theme }) => theme.color.black};
  margin: 0;
`;

const Description = styled.p`
  margin: 0;
  margin-top: 2px;
  margin-bottom: 16px;
  ${({ theme }) => theme.typography.body()}
  color: ${({ theme }) => theme.color.lightGray};
  min-height: 50px;
`;

const ItemPropTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  linkTo: PropTypes.string
};

const Item = ({ title, description, linkTo }) => {
  return (
    <div>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Link to={linkTo}>View</Link>
    </div>
  );
};

Item.propTypes = ItemPropTypes;

export default Item;
