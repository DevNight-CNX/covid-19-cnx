import { fetchPostFormData } from 'utils/services/fetch';
import { prop } from 'ramda';
import apiUrlProvider, { CREATE_REPORT } from 'constants/api-endpoints';

export const createReport = ({ position, content, linkUrl, imageFile }) => {
  const url = apiUrlProvider.get(CREATE_REPORT);
  const body = {
    content,
    image: imageFile,
    link: linkUrl,
    location: prop('location', position)
      ? JSON.stringify([position.location.lat, position.location.lng])
      : null,
    anonymous: 'false'
  };

  return fetchPostFormData(url, body, true).then(response => {
    return response.data;
  });
};
