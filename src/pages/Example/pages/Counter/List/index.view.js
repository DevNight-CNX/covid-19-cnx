import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'components/Button';

const ButtonWrapper = styled.div`
  width: 170px;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  padding: 20px;
`;

const Item = styled.li`
  ${({ theme }) => theme.typography.body}
`;

const ListPropTypes = {
  items: PropTypes.array,
  onDecrementClick: PropTypes.func,
  onIncrementClick: PropTypes.func
};

const List = ({ items, onIncrementClick, onDecrementClick }) => {
  return (
    <Wrapper>
      <ButtonContainer>
        <ButtonWrapper>
          <Button solid size="small" onClick={onIncrementClick}>
            Increment 1
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button solid size="small" onClick={onDecrementClick}>
            Decrement 1
          </Button>
        </ButtonWrapper>
      </ButtonContainer>
      <ul>
        {items.map(item => (
          <Item key={item}>{item}</Item>
        ))}
      </ul>
    </Wrapper>
  );
};

List.propTypes = ListPropTypes;

export default List;
