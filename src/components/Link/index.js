import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  ${({ theme }) => theme.typography.link()}
  color: ${({ theme }) => theme.elementColor.link};
  text-decoration: none;
  letter-spacing: 1px;
  &:hover {
    text-decoration: underline;
  }
`;

export default StyledLink;
