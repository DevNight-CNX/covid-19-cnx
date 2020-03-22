import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Avatar } from 'antd';
import dislikeIcon from './assets/dislike.svg';
import likeIcon from './assets/like.svg';
import locationIcon from './assets/location.svg';
import moment from 'moment';
import LikeManager from 'components/LikeManager';

const CardCustomPropTypes = {
  image: PropTypes.string,
  another: PropTypes.string,
  date: PropTypes.object,
  content: PropTypes.string,
  avatar: PropTypes.string,
  reference: PropTypes.string,
  id: PropTypes.string,
  likes: PropTypes.array,
  dislikes: PropTypes.array,
  location: PropTypes.array
};

const CardCustom = ({
  image,
  another,
  date,
  content,
  avatar,
  reference,
  id,
  likes,
  dislikes,
  location
}) => {
  return (
    <CardStyled
      cover={image ? <img src={image} alt="example" /> : null}
      actions={[
        <LikeManager
          reportId={id}
          likeList={likes}
          dislikeList={dislikes}
          render={({
            likeCount,
            dislikeCount,
            onLikeClick,
            onDislikeClick,
            status
          }) => (
            <ActionWrapper>
              <div>
                <Icons src={likeIcon} alt="likeIcon" onClick={onLikeClick} />
                <CountWrapper>{likeCount}</CountWrapper>
              </div>
              <div>
                <Icons
                  src={dislikeIcon}
                  alt="dislikeIcon"
                  onClick={onDislikeClick}
                />
                <CountWrapper>{dislikeCount}</CountWrapper>
              </div>
            </ActionWrapper>
          )}
        ></LikeManager>
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
      <LocationWrapper>
        {location ? <Icons src={locationIcon} /> : null}
      </LocationWrapper>
    </CardStyled>
  );
};

CardCustom.propTypes = CardCustomPropTypes;

export default CardCustom;

const ActionWrapper = styled.div`
  display: flex;
`;

const CardStyled = styled(Card)`
  width: 100%;
  border: none !important;
  margin: auto !important;
  margin-bottom: 36px !important;
  position: relative;
  cursor: pointer;

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
    padding-left: 62px;
    width: auto;
    background: none;
    margin-bottom: 23px;

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
  margin: 11px 11px 8px 48px;
  max-width: 232px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LocationWrapper = styled.div`
  margin: 0px 0px 8px 48px;
`;
