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

const ListPropTypes = {
  allTask: PropTypes.func,
  completeTask: PropTypes.func,
  incompleteTask: PropTypes.func
};

const Filter = ({ allTask, completeTask, incompleteTask }) => {
  return (
    <ButtonContainer>
      <ButtonWrapper>
        <Button solid size="small" onClick={() => allTask('ALL')}>
          All Task
        </Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button
          solid
          size="small"
          onClick={() => {
            completeTask('COMPLETE');
          }}
        >
          Complete Task
        </Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button solid size="small" onClick={() => incompleteTask('INCOMPLETE')}>
          Incomplete Task
        </Button>
      </ButtonWrapper>
    </ButtonContainer>
  );
};

Filter.propTypes = ListPropTypes;

export default Filter;
