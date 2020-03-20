import React from 'react';
import styled from 'styled-components';
import { Card, Avatar } from 'antd';
import dislikeIcon from './dislike.svg';
import likeIcon from './like.svg';

const { Meta } = Card;

const CardCustom = ({ img, header, content, link, ...props }) => {
  console.log(link);
  return (
    <CardStyled
      cover={img ? <img alt="example" src={img} /> : null}
      actions={[
        <div>
          <Icons src={likeIcon} alt="likeIcon" />
          <CountWrapper>0</CountWrapper>
        </div>,
        <div>
          <Icons src={dislikeIcon} alt="dislikeIcon" />
          <CountWrapper>0</CountWrapper>
        </div>
      ]}
    >
      <Meta
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        }
        title={header.title + ' ' + header.date}
        description={content}
      />
      <TagLinkWrapper>
        <a href={link}>{link}</a>
      </TagLinkWrapper>
    </CardStyled>
  );
};

export default CardCustom;

const CardStyled = styled(Card)`
  max-width: 369px;
  width: 100%;

  img {
    object-fit: contain;
    height: 195px;
  }
  .ant-card-body {
    padding: 16px;
  }
  .ant-card-body .ant-card-meta .ant-card-meta-detail {
    .ant-card-meta-title {
      ${({ theme }) => theme.typography.link()};
      color: ${({ theme }) => theme.color.neutralColor.lightGray300};
    }
    .ant-card-meta-description {
      ${({ theme }) => theme.typography.link()};
      color: ${({ theme }) => theme.color.neutralColor.black};
    }
  }
  .ant-card-actions {
    background: ${({ theme }) => theme.color.neutralColor.white};
    border-top: none;
    padding-left: 66px;
    width: auto;

    li {
      width: auto !important;
      :not(:last-child) {
        border-right: none;
      }
    }
  }
`;

const Icons = styled.img`
  && {
    object-fit: cover;
    width: 18px;
    height: unset;
  }
`;

const CountWrapper = styled.span`
  padding: 10px;
`;

const TagLinkWrapper = styled.div`
  ${({ theme }) => theme.typography.link()};
  color: ${({ theme }) => theme.color.logicColor.info};
  margin: 11px;
  margin-left: 48px;
  max-width: 280px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;
