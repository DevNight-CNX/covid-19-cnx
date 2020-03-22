import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useFirebaseAuthen from 'components/useFirebaseAuthen';
import { useWithUser } from './AuthManager';
import { likeReport, dislikeReport, unlikeReport } from 'services/report';
import eventTracker from 'utils/eventTracker';

const LikeManagerPropTypes = {
  render: PropTypes.func,
  likeList: PropTypes.array,
  dislikeList: PropTypes.array
};

const LikeManager = ({ reportId, render, likeList = [], dislikeList = [] }) => {
  const { userId } = useWithUser();
  const { authentication } = useFirebaseAuthen();
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
    if (authentication()) {
      if (getStatus() === LikeManager.status.like) {
        setUpdatedStatus(LikeManager.status.normal);
        eventTracker({ type: 'onLikeCilcked', id: reportId });
      } else {
        eventTracker({ type: 'onLikeCilckedWithOutAuthen', id: reportId });
        setUpdatedStatus(LikeManager.status.like);
      }
    }
  };

  const onDislikeClick = () => {
    if (authentication()) {
      if (getStatus() === LikeManager.status.dislike) {
        setUpdatedStatus(LikeManager.status.normal);
        eventTracker({ type: 'onDisLikeCilcked', id: reportId });
      } else {
        eventTracker({ type: 'onDisLikeCilckedWithOutAuthen', id: reportId });
        setUpdatedStatus(LikeManager.status.dislike);
      }
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
