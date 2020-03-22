import { fetchPostFormData, fetchGet } from 'utils/services/fetch';
import { prop } from 'ramda';
import apiUrlProvider, {
  CREATE_REPORT,
  REPORT,
  GET_REPORTS
} from 'constants/api-endpoints';

export const createReport = ({ position, content, linkUrl, imageFile }) => {
  const url = apiUrlProvider.get(CREATE_REPORT);
  const body = {
    content,
    image: imageFile,
    link: linkUrl,
    location: prop('location', position)
      ? JSON.stringify([position.location.lat, position.location.lng])
      : null,
    anonymous: ''
  };

  return fetchPostFormData(url, body, true).then(response => {
    if (!response.ok) {
      throw response;
    }
    return response;
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

export const getReportList = () => {
  return fetchGet(apiUrlProvider.get(GET_REPORTS)).then(response => {
    return response.data.map(res => {
      return {
        id: res.id,
        image: res.image,
        avatar: res.reporter.photoURL,
        header: {
          another: res.reporter.displayName,
          date: res.created
        },
        location: res.location,
        content: res.content,
        link: res.link,
        dislikes: res.dislikes,
        likes: res.likes
      };
    });
  });
};
