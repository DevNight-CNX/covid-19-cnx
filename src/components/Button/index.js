import styled from 'styled-components';
import { Button } from 'antd';

const Buttons = styled(Button)`
  && {
    ${({ theme }) => theme.typography.button()};
    background: ${({ theme, type }) =>
      type ? null : theme.color.primaryColor.blueRibbon};
    color: ${({ theme, type }) =>
      type
        ? theme.color.primaryColor.blueRibbon
        : theme.color.neutralColor.white};
    border: 1px solid ${({ theme }) => theme.color.primaryColor.blueRibbon};
    border-radius: 4px;
    max-width: 150px;
    width: 100%;

    :hover {
      background: ${({ theme, type }) =>
        type ? null : theme.color.alternativeColors.blueRibbonDark};
      color: ${({ theme, type }) =>
        type
          ? theme.color.alternativeColors.blueRibbonDark
          : theme.color.neutralColor.white};
      border: 1px solid
        ${({ theme }) => theme.color.alternativeColors.blueRibbonDark};
    }
    :active {
      background: ${({ theme, type }) =>
        type ? null : theme.color.alternativeColors.blueRibbonDark};
      color: ${({ theme, type }) =>
        type
          ? theme.color.alternativeColors.blueRibbonDark
          : theme.color.neutralColor.white};
      border: 1px solid
        ${({ theme }) => theme.color.alternativeColors.blueRibbonDark};
    }
    :focus {
      background: ${({ theme, type }) =>
        type ? null : theme.color.alternativeColors.blueRibbonDark};
      color: ${({ theme, type }) =>
        type
          ? theme.color.alternativeColors.blueRibbonDark
          : theme.color.neutralColor.white};
      border: 1px solid
        ${({ theme }) => theme.color.alternativeColors.blueRibbonDark};
    }
  }
`;

export default Buttons;
