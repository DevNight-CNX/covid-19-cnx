import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from 'components/Button';

const ButtonWrapper = styled.div`
  width: 170px;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Form = styled.form`
  display: flex;
`;

const AddTodoProptype = {
  submitTodo: PropTypes.func,
  setValue: PropTypes.func,
  value: PropTypes.string
};

const AddTodo = ({ submitTodo, setValue, value }) => {
  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        submitTodo();
      }}
    >
      <ButtonContainer>
        <input
          onChange={event => setValue(event.target.value)}
          required
          value={value}
        />
        <ButtonWrapper>
          <Button solid size="small" type="submit">
            Add Todo List
          </Button>
        </ButtonWrapper>
      </ButtonContainer>
    </Form>
  );
};

AddTodo.propTypes = AddTodoProptype;

export default AddTodo;
