import styled from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => theme.typography.field()}
  margin: 15px 0;
`;
