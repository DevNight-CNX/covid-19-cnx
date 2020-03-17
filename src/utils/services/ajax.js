import { ajax } from 'rxjs/ajax';
import { getToken } from 'services/auth/token';

const init = {
  url: '',
  method: '',
  params: {},
  body: {},
  isAuth: false
};

const ajaxService = props => {
  const requestOptions = genRequestOptions({
    ...init,
    ...props
  });
  return ajax(requestOptions);
};
export const ajaxGet = props => {
  const requestOptions = genRequestOptions({
    ...init,
    ...props,
    method: 'GET'
  });
  return ajax(requestOptions);
};
export const ajaxPut = props => {
  const requestOptions = genRequestOptions({
    ...init,
    ...props,
    method: 'PUT'
  });
  return ajax(requestOptions);
};
export const ajaxPost = props => {
  const requestOptions = genRequestOptions({
    ...init,
    ...props,
    method: 'POST'
  });
  return ajax(requestOptions);
};
export const ajaxDelete = props => {
  const requestOptions = genRequestOptions({
    ...init,
    ...props,
    method: 'DELETE'
  });
  return ajax(requestOptions);
};

const genRequestOptions = props => {
  const { url, method, params, body, isAuth } = props;
  const requestOptions = props;
  const headers = getHeader(isAuth);

  if (method === 'GET') {
    requestOptions.url = genUrlParams(url, params);
    delete headers['Content-Type'];
  }
  requestOptions.headers = headers;
  requestOptions.body = parsedBody(body);
  return {
    headers,
    ...requestOptions
  };
};

const getHeader = isAuth => {
  const headers = isAuth
    ? {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `${getToken() || ''}`
      }
    : {
        'Content-Type': 'application/json; charset=utf-8 '
      };
  return headers;
};

const genUrlParams = (url, params) => {
  let urlParams = url;
  try {
    urlParams = new URL(url);
    Object.keys(params || {}).forEach(key =>
      urlParams.searchParams.append(key, params[key])
    );
  } catch (e) {
    console.warn('Url is invalid');
  }

  return urlParams;
};

const parsedBody = body => {
  try {
    return JSON.stringify(body);
  } catch (e) {
    throw new Error(`body for send to api isn't valid json`);
  }
};

export default ajaxService;
