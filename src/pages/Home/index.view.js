import styled from 'styled-components';
import { ReactComponent as BaseLogo } from './assets/logo.svg';
import { ReactComponent as BaseCircle } from './assets/circle.svg';

export const Logo = styled(BaseLogo)``;

export const Circle = styled(BaseCircle)`
  width: 70%;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 0;
`;

export const Header = styled.div`
  height: 124px;
  padding-top: 44px;
  box-sizing: border-box;
`;

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 24px 70px;
  box-sizing: border-box;
  position: relative;
`;

export const ButtonWrapper = styled.div`
  width: 200px;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.typography.title()};
  color: ${({ theme }) => theme.color.white};
  margin: 0;
  margin-bottom: 88px;
  position: relative;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: calc(100vh - 160px);
  position: relative;
`;
