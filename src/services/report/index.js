import { fetchGet } from 'utils/services/fetch';

import apiUrlProvider, { GET_REPORTS } from 'constants/api-endpoints';

export const getReportList = () => {
  return fetchGet(apiUrlProvider.get(GET_REPORTS)).then(response => {
    return response.data.map(res => {
      return {
        image: res.image,
        avatar: res.reporter.photoURL,
        header: {
          another: res.reporter.displayName,
          date: res.created
        },
        location: res.location,
        content: res.content,
        link: res.link
      };
    });
  });
};
