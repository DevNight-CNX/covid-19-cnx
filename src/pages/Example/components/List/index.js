import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Item from '../Item';

const GridWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 64px;
  padding: 0px 24px;
  box-sizing: border-box;
`;

const ListWrapperPropTypes = {
  items: PropTypes.array
};

const ListWrapperDefaultProps = {
  items: []
};

const ListWrapper = ({ items }) => {
  return (
    <GridWrapper>
      {items.map(item => (
        <Item
          title={item.title}
          description={item.description}
          linkTo={item.linkTo}
        />
      ))}
    </GridWrapper>
  );
};

ListWrapper.propTypes = ListWrapperPropTypes;
ListWrapper.defaultProps = ListWrapperDefaultProps;

export default memo(ListWrapper);
