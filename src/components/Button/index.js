import styled from 'styled-components';
import { provideVariant } from 'utils/style';

const size = provideVariant('size', {
  small: '8px 0',
  medium: '14px 0'
});

const ButtonDefaultProps = {
  size: 'medium'
};

const Button = styled.button`
  width: 100%;
  color: ${({ theme }) => theme.elementColor.buttonText};
  background-color: ${({ solid, theme }) =>
    !solid ? 'transparent' : theme.elementColor.button};
  border: 2px solid ${({ theme }) => theme.elementColor.buttonOutline};
  padding: ${size};
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;

  ${({ theme }) => theme.typography.button()}

  &:hover {
    background-color: ${({ theme }) => theme.elementColor.button};
    border-color: ${({ theme }) => theme.elementColor.button};
  }
`;

Button.defaultProps = ButtonDefaultProps;

export default Button;
