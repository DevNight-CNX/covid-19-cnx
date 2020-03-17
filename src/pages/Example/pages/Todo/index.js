import React from 'react';
import { Wrapper, Headline, Container } from './index.view';
import AddTodoContainer from './AddTodo';
import ListContainer from './List';
import FilterContainer from './Filter';

const TodoList = () => {
  return (
    <Wrapper>
      <Container>
        <Headline>TodoList</Headline>
        <AddTodoContainer />
        <FilterContainer />
        <ListContainer />
      </Container>
    </Wrapper>
  );
};

export default TodoList;
