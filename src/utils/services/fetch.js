import { getToken } from 'services/auth/token';
import i18n from 'i18n';

/* eslint-disable  no-console */
const genRequestOptions = (method, body, options) => {
  let parsedBody;
  const languageKey = i18n.language;

  const { isAuth, token } = options;

  try {
    if (body) {
      parsedBody = JSON.stringify(body);
    } else {
      parsedBody = null;
    }
  } catch (e) {
    throw new Error(`body for send to api isn't valid json`);
  }

  const headers = isAuth
    ? {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token || getToken() || ''}`
        // 'x-localization': languageKey
      }
    : {
        'Content-Type': 'application/json; charset=utf-8'
        // 'x-localization': languageKey
      };

  if (method === 'GET' || method === 'DELETE') {
    delete headers['Content-Type'];
  }
  return {
    method,
    headers,
    body: method === 'GET' || method === 'DELETE' ? null : parsedBody
  };
};

const handleSuccess = response =>
  response.json().then(body => {
    if (Array.isArray(body)) {
      return {
        data: body,
        response
      };
    } else {
      return {
        ...body,
        response
      };
    }
  });

const handleFail = response =>
  response.json().then(body => {
    if (Array.isArray(body)) {
      return {
        data: body,
        response
      };
    } else {
      return {
        ...body,
        response
      };
    }
  });

const handleResponse = response => {
  if (response.ok) {
    return handleSuccess(response);
  }
  return handleFail(response).then(error => {
    throw error;
  });
};

export const fetchGet = (url, params, options = {}) => {
  let urlParams = url;
  try {
    urlParams = new URL(url);
    Object.keys(params || {}).forEach(key =>
      urlParams.searchParams.append(key, params[key])
    );
  } catch (e) {
    console.warn('Url is invalid');
  }

  const requestOptions = genRequestOptions('GET', null, options);
  return fetch(urlParams, requestOptions).then(handleResponse);
};

export const fetchPost = (url, body, options = {}) => {
  const requestOptions = genRequestOptions('POST', body, options);
  return fetch(url, requestOptions).then(handleResponse);
};

export const fetchPut = (url, body, options = {}) => {
  const requestOptions = genRequestOptions('PUT', body, options);
  return fetch(url, requestOptions).then(handleResponse);
};

export const fetchDelete = (url, params, options = {}) => {
  let urlParams = url;
  try {
    urlParams = new URL(url);
    Object.keys(params || {}).forEach(key =>
      urlParams.searchParams.append(key, params[key])
    );
  } catch (e) {
    console.warn('Url is invalid');
  }

  const requestOptions = genRequestOptions('DELETE', null, options);
  return fetch(urlParams, requestOptions).then(handleResponse);
};

export const getSuccessData = res => res.data;

export const getFailData = res => res.errors;

export const fetchPostFormData = (url, body, isAuth = false) => {
  const payload = new FormData();

  if (body) {
    Object.keys(body).forEach(key => {
      if (body[key]) {
        payload.append(key, body[key]);
      }
    });
  }

  const requestOptions = {
    method: 'POST',
    body: payload,
    headers: isAuth
      ? {
          Authorization: `Bearer ${getToken() || ''}`
        }
      : undefined
  };
  return fetch(url, requestOptions);
};
