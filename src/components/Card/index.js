import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Avatar } from 'antd';
import dislikeIcon from './dislike.svg';
import likeIcon from './like.svg';
import moment from 'moment';

const { Meta } = Card;

const CardCustomPropTypes = {
  image: PropTypes.string,
  header: PropTypes.object,
  content: PropTypes.string,
  avatar: PropTypes.string,
  link: PropTypes.string
};

const CardCustom = ({ image, header, content, avatar, link }) => {
  return (
    <CardStyled
      cover={image ? <img src={image} alt="example" /> : null}
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
        avatar={<Avatar src={avatar} />}
        title={header.another + ' ' + moment(header.date).format('LT l')}
        description={content}
      />
      <TagLinkWrapper>
        <a href={link}>{link}</a>
      </TagLinkWrapper>
    </CardStyled>
  );
};

CardCustom.propTypes = CardCustomPropTypes;

export default CardCustom;

const CardStyled = styled(Card)`
  max-width: 360px;
  width: 100%;
  border: none !important;

  img {
    object-fit: contain;
    height: 100%;
    background-color: ${({ theme }) => theme.color.neutralColor.lightGray100};
  }
  .ant-card-cover {
    height: 195px;
  }
  .ant-card-body {
    padding: 16px;
    padding-bottom: 0;
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
    border-top: none;
    padding-left: 66px;
    width: auto;
    background: none;

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
    object-fit: contain;
    width: 18px;
    height: unset;
    background: none;
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
  max-width: 232px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;
