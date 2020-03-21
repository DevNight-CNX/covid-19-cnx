import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useWithUser } from './AuthManager';
import { likeReport, dislikeReport, unlikeReport } from 'services/report';

const LikeManagerPropTypes = {
  render: PropTypes.func,
  likeList: PropTypes.array,
  dislikeList: PropTypes.array
};

const LikeManager = ({ reportId, render, likeList = [], dislikeList = [] }) => {
  const { userId } = useWithUser();
  const [updatedStatus, setUpdatedStatus] = useState(null);

  useEffect(() => {
    if (updatedStatus === LikeManager.status.normal) {
      unlikeReport(reportId);
    } else if (updatedStatus === LikeManager.status.like) {
      likeReport(reportId);
    } else if (updatedStatus === LikeManager.status.dislike) {
      dislikeReport(reportId);
    }
  }, [updatedStatus]);

  const onLikeClick = () => {
    if (getStatus() === LikeManager.status.like) {
      setUpdatedStatus(LikeManager.status.normal);
    } else {
      setUpdatedStatus(LikeManager.status.like);
    }
  };

  const onDislikeClick = () => {
    if (getStatus() === LikeManager.status.dislike) {
      setUpdatedStatus(LikeManager.status.normal);
    } else {
      setUpdatedStatus(LikeManager.status.dislike);
    }
  };

  const getLikeList = () =>
    likeList.filter(likeUserId => likeUserId !== userId);

  const getDisLikeList = () =>
    dislikeList.filter(dislikeUserId => dislikeUserId !== userId);

  const getStatus = () => {
    if (updatedStatus) {
      return updatedStatus;
    }

    if (likeList.includes(userId)) {
      return LikeManager.status.like;
    } else if (dislikeList.includes(userId)) {
      return LikeManager.status.dislike;
    } else {
      return LikeManager.status.normal;
    }
  };

  const getLikeCount = () =>
    getLikeList().length + (LikeManager.status.like === getStatus() ? 1 : 0);

  const getDisLikeCount = () =>
    getDisLikeList().length +
    (LikeManager.status.dislike === getStatus() ? 1 : 0);

  return render({
    status: getStatus(),
    likeCount: getLikeCount(),
    dislikeCount: getDisLikeCount(),
    onLikeClick,
    onDislikeClick
  });
};

LikeManager.status = {
  like: 'LIKE',
  dislike: 'DISLIKE',
  normal: 'NORMAL'
};

LikeManager.propTypes = LikeManagerPropTypes;

export default LikeManager;
