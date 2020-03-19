import { fetchGet } from 'utils/services/fetch';
import apiUrlProvider, { CASE } from 'constants/api-endpoints';

export const getCases = () => {
  const url = apiUrlProvider.getMock(CASE.LIST);
  return fetchGet(url).then(response => {
    return response.features;
  });
};
