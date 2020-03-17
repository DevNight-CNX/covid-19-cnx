import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 950px;
`;

export const Headline = styled.h1`
  ${({ theme }) => theme.typography.title()}
  color: ${({ theme }) => theme.color.black};
`;

export { Wrapper };
