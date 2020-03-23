import styled, { css } from 'styled-components';
import { Card } from 'antd';

const Content = styled.div`
  display: flex;
`;

const ActionWrapper = styled.div`
  display: flex;
`;

const CardStyled = styled(Card)`
  width: 100%;
  border: none !important;
  margin: auto !important;
  position: relative;
  cursor: pointer;

  img {
    object-fit: contain;
    height: 100%;
    background-color: ${({ theme }) => theme.color.neutralColor.background};
  }
  .ant-card-cover {
    ${({ path }) =>
      path !== '/report/:id' &&
      css`
        height: 195px;
      `};
  }
  .ant-card-body {
    padding: 16px;
  }
  .ant-card-actions {
    border-top: none;
    margin-left: 62px;
    width: auto;
    background: none;
    padding-bottom: 23px;

    li {
      width: auto !important;
      :not(:last-child) {
        border-right: none;
      }
    }
  }
`;

const Container = styled.div`
  .avatar {
    ${({ theme }) => theme.typography.link()};
    color: ${({ theme }) => theme.color.neutralColor.lightGray300};
    padding-left: 16px;
  }
  .description {
    ${({ theme }) => theme.typography.link()};
    color: ${({ theme }) => theme.color.neutralColor.black};
  }

  pre {
    padding-left: 16px;
    margin: 0;
    margin-top: 4px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-wrap;
  }
`;

const Icons = styled.img`
  && {
    object-fit: contain;
    width: 18px;
    height: unset;
    background: none;
    cursor: pointer;
  }
`;

const CountWrapper = styled.span`
  padding: 10px;
`;

const TagLinkWrapper = styled.div`
  ${({ theme }) => theme.typography.link()};
  color: ${({ theme }) => theme.color.logicColor.info};
  margin: 11px 11px 7px 16px;
  max-width: 232px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LocationWrapper = styled.div`
  ${({ theme }) => theme.typography.link()};
  color: ${({ theme }) => theme.color.neutralColor.lightGray300};
  margin-left: 16px;
  display: flex;
`;

const LikeManagerWrapper = styled.div`
  padding: 0 0 36px 66px;
`;

export {
  Content,
  ActionWrapper,
  CardStyled,
  Container,
  Icons,
  CountWrapper,
  TagLinkWrapper,
  LocationWrapper,
  LikeManagerWrapper
};
