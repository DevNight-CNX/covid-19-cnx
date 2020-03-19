import { fetchGet } from 'utils/services/fetch';

import apiUrlProvider, {
  GET_NEWS,
  GET_NEWS_BY_ID
} from 'constants/api-endpoints';

export const getNews = id => {
  if (id) {
    return fetchGet(apiUrlProvider.get(GET_NEWS_BY_ID, id)).then(response => {
      return {
        data: {
          time: response.time,
          newsLink: response.news_links,
          newsId: response.news_id,
          location: response.location,
          title: response.title,
          id: response.id
        }
      };
    });
  } else {
    return fetchGet(apiUrlProvider.get(GET_NEWS)).then(response => {
      return {
        data: response.data.map(rawData => {
          return {
            time: rawData.time,
            newsLink: rawData.news_links,
            newsId: rawData.news_id,
            location: rawData.location,
            title: rawData.title,
            id: rawData.id
          };
        })
      };
    });
  }
};
