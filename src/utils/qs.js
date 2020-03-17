import queryString from 'qs';

export const parse = search => {
  return queryString.parse(search, {
    ignoreQueryPrefix: true
  });
};
