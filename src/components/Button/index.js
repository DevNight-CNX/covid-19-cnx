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
    height: auto;
    padding: ${({ icon }) => (icon ? ` 7px 16px` : `7px 32px`)};
    display: flex;
    align-items: center;

    svg {
      margin-right: 8px;
    }

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
