import React from 'react';
import List from './List';
import { Wrapper, Headline, Container } from './index.view';

const Counter = () => {
  return (
    <Wrapper>
      <Container>
        <Headline>Counter</Headline>
        <List />
      </Container>
    </Wrapper>
  );
};

export default Counter;
