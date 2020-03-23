import { fetchPostFormData, fetchGet } from 'utils/services/fetch';
import { prop } from 'ramda';
import apiUrlProvider, {
  CREATE_REPORT,
  REPORT,
  GET_REPORTS,
  GET_REPORT_BY_ID
} from 'constants/api-endpoints';

export const createReport = ({ position, content, linkUrl, imageFile }) => {
  const url = apiUrlProvider.get(CREATE_REPORT);
  const body = {
    content,
    image: imageFile,
    link: linkUrl,
    address: prop('name', position),
    location: prop('location', position)
      ? JSON.stringify([position.location.lat, position.location.lng])
      : null,
    anonymous: false
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
        likes: res.likes,
        date: res.created
      };
    });
  });
};

export const getReportById = id => {
  return fetchGet(apiUrlProvider.get(GET_REPORT_BY_ID, { id })).then(
    response => {
      return {
        id: response.id,
        image: response.image,
        avatar: response.reporter.photoURL,
        header: {
          another: response.reporter.displayName,
          date: response.created
        },
        location: response.location,
        content: response.content,
        link: response.link,
        dislikes: response.dislikes,
        likes: response.likes,
        date: response.created
      };
    }
  );
};
