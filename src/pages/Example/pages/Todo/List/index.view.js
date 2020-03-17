import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px;
`;

const Checkbox = styled.input``;

const Item = styled.div`
  ${({ theme }) => theme.typography.body()}
`;

const ListPropTypes = {
  items: PropTypes.array,
  checkedTodo: PropTypes.func
};

const List = ({ items, checkedTodo }) => {
  return (
    <Wrapper>
      {items.map(item => (
        <Item key={item.key}>
          <Checkbox
            type="checkbox"
            defaultChecked={item.isChecked}
            onChange={() => {
              checkedTodo(item.key);
            }}
          />
          {item.text}
        </Item>
      ))}
    </Wrapper>
  );
};

List.propTypes = ListPropTypes;

export default List;
