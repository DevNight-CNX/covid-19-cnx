import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Skeleton, Avatar } from 'antd';
import dislikeIcon from './assets/dislike.svg';
import actionDislike from './assets/actionDislike.svg';
import likeIcon from './assets/like.svg';
import actionLike from './assets/actionLike.svg';
import locationIcon from './assets/location.svg';
import moment from 'moment';
import LikeManager from 'components/LikeManager';
import {
  Content,
  ActionWrapper,
  CardStyled,
  Container,
  Icons,
  CountWrapper,
  TagLinkWrapper,
  LocationWrapper,
  LikeManagerWrapper
} from './index.view';
import eventTracker from 'utils/eventTracker';
import getSafeLink from 'utils/getSafeLink';
import { withRouter } from 'react-router-dom';

const CardCustomPropTypes = {
  image: PropTypes.string,
  another: PropTypes.string,
  date: PropTypes.number,
  content: PropTypes.string,
  avatar: PropTypes.string,
  reference: PropTypes.string,
  id: PropTypes.string,
  likes: PropTypes.array,
  dislikes: PropTypes.array,
  location: PropTypes.array,
  report: PropTypes.object,
  onClick: PropTypes.func,
  address: PropTypes.string,
  match: PropTypes.object,
  isFull: PropTypes.bool
};

const CardCustomDefaultProps = {
  report: {},
  onClick: () => {}
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
  onClick,
  report,
  address,
  match,
  isFull
}) => {
  return (
    <>
      <CardStyled
        onClick={() => {
          onClick(report.id);
          eventTracker({ type: 'onClickedCard', id: report.id });
        }}
        cover={image ? <img src={image} alt={content} /> : null}
        path={match.path}
        isFull={isFull}
      >
        <Content>
          <div>
            <Avatar src={avatar} />
          </div>
          <div>
            <Container>
              <div className="avatar">
                {`${another} ${moment(date).format('LT L')}`}
              </div>
              <pre className="description">{content}</pre>
            </Container>
            {reference ? (
              <TagLinkWrapper>
                <a
                  href={`${getSafeLink(reference)}`}
                  target="_blank"
                  onClick={event => event.stopPropagation()}
                >
                  {reference}
                </a>
              </TagLinkWrapper>
            ) : null}
            {address ? (
              <LocationWrapper>
                <Icons
                  src={locationIcon}
                  alt="locationIcon"
                  style={{ marginRight: 5 }}
                />
                {address}
              </LocationWrapper>
            ) : null}
          </div>
        </Content>
      </CardStyled>
      <LikeManagerWrapper>
        <LikeManager
          reportId={id}
          likeList={likes}
          dislikeList={dislikes}
          render={({
            likeCount,
            dislikeCount,
            onLikeClick,
            onDislikeClick,
            status,
            like,
            dislike
          }) => (
            <ActionWrapper>
              <Icons
                src={status === like ? actionLike : likeIcon}
                alt="likeIcon"
                onClick={() => onLikeClick()}
              />
              <CountWrapper>{likeCount}</CountWrapper>
              <Icons
                src={status === dislike ? actionDislike : dislikeIcon}
                alt="dislikeIcon"
                onClick={() => onDislikeClick()}
              />
              <CountWrapper>{dislikeCount}</CountWrapper>
            </ActionWrapper>
          )}
        ></LikeManager>
      </LikeManagerWrapper>
    </>
  );
};
CardCustom.propTypes = CardCustomPropTypes;
CardCustom.defaultProps = CardCustomDefaultProps;

const CardsLoading = ({ rows }) => {
  return (
    <>
      {[...Array(rows)].map((v, i) => (
        <Fragment key={i}>
          <Skeleton avatar active paragraph={{ rows: 4 }} />
          <br />
        </Fragment>
      ))}
    </>
  );
};
CardsLoading.propTypes = {
  rows: PropTypes.number
};
CardsLoading.defaultProps = {
  rows: 3
};

export { CardsLoading };

export default withRouter(CardCustom);
