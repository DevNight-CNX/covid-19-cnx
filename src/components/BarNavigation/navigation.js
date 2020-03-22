import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from './assets/close.svg';
import { ReactComponent as BackIcon } from './assets/back.svg';

const Header = ({ children }) => {
  return (
    <Wrapper>
      <Title>{children}</Title>
      <CloseIcon />
    </Wrapper>
  );
};

const BackHeader = ({ children }) => {
  return (
    <Wrapper>
      <Title>
        <BackIcon style={{ marginRight: 18 }} />
        {children}
      </Title>
    </Wrapper>
  );
};

export { Header, BackHeader };

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 57px;
  background: #ffffff;
  box-shadow: inset 0px -1px 0px #f0f0f0;
`;

const Title = styled.span`
  ${({ children, theme }) =>
    children === 'รายงานข่าว'
      ? theme.typography.bodyLarge()
      : theme.typography.body()};
  color: ${({ children, theme }) =>
    children === 'รายงานข่าว'
      ? theme.color.neutralColor.black
      : theme.color.primaryColor.blue};
  display: flex;
  align-items: center;
  max-width: 316px;
  width: 100%;
  height: 100%;
  padding: 24px;
  padding-bottom: 15px;
`;
