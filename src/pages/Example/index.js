import React from 'react';
import { Wrapper, Headline, Container } from './index.view';
import List from './List';

const Example = () => {
  return (
    <Wrapper>
      <Container>
        <Headline>Example</Headline>
        <List />
      </Container>
    </Wrapper>
  );
};

export default Example;
