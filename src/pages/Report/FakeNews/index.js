import React from 'react';
import FakeNewCount from './FakeNewCount';
import Explanation from './Explanation';
import styled from 'styled-components';
import FakeNewsIcon from './assets/FakeNews.svg';

const FakeNewsWrapper = styled.div`
  ${({ theme }) => theme.typography.body()};
  color: ${({ theme }) => theme.color.error};
  background-color: ${({ theme }) => theme.color.neutralColor.background};
  margin-top: 3px;
  padding: 8px 0;
  position: relative;
  text-align: center;
`;
const ExplanationWrapper = styled.div`
  ${({ theme }) => theme.typography.body()};
  background-color: ${({ theme }) => theme.color.secondaryColor.gold};
  padding: 24px 26px;
`;
ExplanationWrapper.Title = styled.div`
  ${({ theme }) => theme.typography.bodyLarge()};
  color: ${({ theme }) => theme.color.neutralColor.black};
  margin-bottom: 8px;
`;
ExplanationWrapper.Content = styled.div``;

const FakeNewsReport = () => {
  return (
    <>
      <FakeNewCount />
      <Explanation />
    </>
  );
};

export default FakeNewsReport;
