import { fetchGet } from 'utils/services/fetch';
import apiUrlProvider, { SUMMARY } from 'constants/api-endpoints';

export const getAllSummary = () => {
  return fetchGet(apiUrlProvider.get(SUMMARY));
};
