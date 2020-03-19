import { fetchGet } from 'utils/services/fetch';
import apiUrlProvider, { CASE } from 'constants/api-endpoints';

export const getCases = () => {
  const url = apiUrlProvider.get(CASE.LIST);
  return fetchGet(url).then(response => {
    console.log('response', response);
    return response.data;
  });
};
