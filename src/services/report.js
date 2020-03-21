import { fetchPostFormData, fetchGet } from 'utils/services/fetch';
import { prop } from 'ramda';
import apiUrlProvider, { CREATE_REPORT, REPORT } from 'constants/api-endpoints';

export const createReport = ({ position, content, linkUrl, imageFile }) => {
  const url = apiUrlProvider.get(CREATE_REPORT);
  const body = {
    content,
    image: imageFile,
    link: linkUrl,
    location: prop('location', position)
      ? JSON.stringify([position.location.lat, position.location.lng])
      : null
  };

  return fetchPostFormData(url, body, true).then(response => {
    return response.data;
  });
};

export const likeReport = id => {
  const url = apiUrlProvider.get(REPORT.LIKE, {
    id
  });

  return fetchGet(url, null, {
    isAuth: true
  });
};

export const dislikeReport = id => {
  const url = apiUrlProvider.get(REPORT.DISLIKE, {
    id
  });

  return fetchGet(url, null, {
    isAuth: true
  });
};

export const unlikeReport = id => {
  const url = apiUrlProvider.get(REPORT.UNLIKE, {
    id
  });

  return fetchGet(url, null, {
    isAuth: true
  });
};
