import { fetchPostFormData, fetchGet } from 'utils/services/fetch';
import { prop } from 'ramda';
import apiUrlProvider, {
  CREATE_REPORT,
  REPORT,
  GET_REPORTS,
  GET_REPORT_BY_ID
} from 'constants/api-endpoints';

const anonymousImage =
  'https://firebasestorage.googleapis.com/v0/b/covid-19-cnx/o/Anonymous%20Profile.svg?alt=media&token=ef63c155-ac35-4104-ab9a-fdcf5f27e289';

const anonymousDisplayName = 'Anonymous';

export const createReport = ({
  position,
  content,
  linkUrl,
  imageFile,
  anonymous,
  type
}) => {
  const url = apiUrlProvider.get(CREATE_REPORT);
  const body = {
    content,
    type,
    image: imageFile,
    link: linkUrl,
    address: prop('name', position),
    location: prop('location', position)
      ? JSON.stringify([position.location.lat, position.location.lng])
      : null,
    anonymous
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
    return response.data.map((res, index) => {
      return {
        id: res.id,
        image: res.image,
        avatar: prop('photoURL', res.reporter) || anonymousImage,
        header: {
          another: prop('displayName', res.reporter) || anonymousDisplayName,
          date: res.created
        },
        location: res.location,
        content: res.content,
        link: res.link,
        dislikes: res.dislikes,
        likes: res.likes,
        address: res.address,
        date: res.created,
        index,
        type: res.type
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
        avatar: prop('photoURL', response.reporter) || anonymousImage,
        header: {
          another:
            prop('displayName', response.reporter) || anonymousDisplayName,
          date: response.created
        },
        location: response.location,
        content: response.content,
        link: response.link,
        dislikes: response.dislikes,
        likes: response.likes,
        date: response.created,
        address: response.address
      };
    }
  );
};
