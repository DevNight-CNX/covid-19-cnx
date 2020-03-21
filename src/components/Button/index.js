import styled from 'styled-components';
import { Button } from 'antd';

const Buttons = styled(Button)`
  && {
    ${({ theme }) => theme.typography.button()};
    background: ${({ theme, outline }) =>
      outline ? null : theme.color.primaryColor.blueRibbon};
    color: ${({ theme, outline }) =>
      outline
        ? theme.color.primaryColor.blueRibbon
        : theme.color.neutralColor.white};
    border: 1px outline ${({ theme }) => theme.color.primaryColor.blueRibbon};
    border-radius: 4px;
    max-width: 150px;
    padding: 7px 32px;
    height: auto;

    :hover {
      background: ${({ theme, outline }) =>
        outline ? null : theme.color.alternativeColors.blueRibbonDark};
      color: ${({ theme, outline }) =>
        outline
          ? theme.color.alternativeColors.blueRibbonDark
          : theme.color.neutralColor.white};
      border: 1px outline
        ${({ theme }) => theme.color.alternativeColors.blueRibbonDark};
    }
    :active {
      background: ${({ theme, outline }) =>
        outline ? null : theme.color.alternativeColors.blueRibbonDark};
      color: ${({ theme, outline }) =>
        outline
          ? theme.color.alternativeColors.blueRibbonDark
          : theme.color.neutralColor.white};
      border: 1px outline
        ${({ theme }) => theme.color.alternativeColors.blueRibbonDark};
    }
    :focus {
      background: ${({ theme, outline }) =>
        outline ? null : theme.color.alternativeColors.blueRibbonDark};
      color: ${({ theme, outline }) =>
        outline
          ? theme.color.alternativeColors.blueRibbonDark
          : theme.color.neutralColor.white};
      border: 1px outline
        ${({ theme }) => theme.color.alternativeColors.blueRibbonDark};
    }
  }
`;

export default Buttons;
