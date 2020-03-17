import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.grey};
  min-height: 100vh;
  padding-top: 5.5vw;
  box-sizing: border-box;
`;

export const Headline = styled.h1`
  ${({ theme }) => theme.typography.title()}
  color: ${({ theme }) => theme.color.black};
  margin: 0;
  margin-bottom: 5.357vw;
  padding-left: 20px;
`;

export const Container = styled.div`
  max-width: 904px;
  margin: 0 auto;
`;
