import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import Button from './index';

const ButtonWrapper = styled.div`
  width: 200px;
`;

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.secondary};
`;

storiesOf('Button', module)
  .add('normal state', () => (
    <Wrapper>
      <ButtonWrapper>
        <Button>View Example</Button>
      </ButtonWrapper>
    </Wrapper>
  ))
  .add('solid variant', () => (
    <Wrapper>
      <ButtonWrapper>
        <Button solid>View Example</Button>
      </ButtonWrapper>
    </Wrapper>
  ))
  .add('small size', () => (
    <Wrapper>
      <ButtonWrapper>
        <Button size="small">View Example</Button>
      </ButtonWrapper>
    </Wrapper>
  ));
