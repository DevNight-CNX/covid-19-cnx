import { fetchGet } from 'utils/services/fetch';

import apiUrlProvider, {
  GET_NEWS,
  GET_NEWS_BY_ID
} from 'constants/api-endpoints';

export const getNews = id => {
  if (id) {
    return fetchGet(apiUrlProvider.get(GET_NEWS_BY_ID, id)).then(response => {
      return { data: response.data };
    });
  } else {
    return fetchGet(apiUrlProvider.get(GET_NEWS)).then(response => {
      return { data: response.data };
    });
  }
};
