import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Avatar } from 'antd';
import dislikeIcon from './assets/dislike.svg';
import likeIcon from './assets/like.svg';
import moment from 'moment';

const CardCustomPropTypes = {
  image: PropTypes.string,
  another: PropTypes.string,
  date: PropTypes.object,
  content: PropTypes.string,
  avatar: PropTypes.string,
  reference: PropTypes.string
};

const CardCustom = ({ image, another, date, content, avatar, reference }) => {
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
      <Container>
        <Avatar src={avatar} />
        <span className="avatar">
          {another + ' ' + moment(date).format('LT l')}
        </span>
        <pre className="description">{content}</pre>
      </Container>
      <TagLinkWrapper>
        <a href={reference}>{reference}</a>
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
  margin-bottom: 36px !important;

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
  .ant-card-actions {
    border-top: none;
    padding-left: 48px;
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
    padding-left: 48px;
    margin: 0;
    max-width: 280px;
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
