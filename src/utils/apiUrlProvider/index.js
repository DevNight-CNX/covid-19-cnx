import { is, replace, differenceWith } from 'ramda';

const createValidator = apis => {
  const errorMessage = {
    setter: {
      notProvideName: () => `api's name isn't provided(first argument)`,
      notProvideUrl: () => `api's url isn't provided(second argument)`,
      nameIsAlreadyProvided: name => `api's name "${name}" is already provided`,
      urlIsAlreadyProvided: (name, url) =>
        `api's url "${url}" is already provided for "${name}"`
    },
    getter: {
      nameIsNotDefined: name => `api's name "${name}" is not provided`,
      notProvideName: () => `api's name isn't provided(first argument)`
    },
    baseUrl: {
      baseUrlIsNotProvided: () => `base url isn't provided(first argumnent)`
    },
    params: {
      whenParamsIsNotObject: () => `params argument need to be object`,
      whenParamsIsNotFound: (params, name) =>
        `there's no ${params.map(paramName => `"${paramName}"`).join(', ')} ${
          params.length > 1 ? 'params' : 'param'
        } for "${name}"`,
      whenParamsIsNotMeet: (params, name) =>
        `you didn't provide value for ${params
          .map(paramName => `"${paramName}"`)
          .join(', ')} ${params.length > 1 ? 'params' : 'param'} for "${name}"`
    }
  };

  const throwErrorWhenNameOrUrlIsNotProvidedForSetter = (name, url) => {
    if (!name) {
      throw new Error(errorMessage.setter.notProvideName());
    }

    if (!url) {
      throw new Error(errorMessage.setter.notProvideUrl());
    }
  };

  const throwErrorWhenNameIsNotProvidedForGetter = name => {
    if (!name) {
      throw new Error(errorMessage.getter.notProvideName(name));
    }
  };

  const throwErrorWhenNameIsAlreadyUsed = name => {
    const apiNameList = Object.keys(apis);
    const isApiNameAlreadyProvided = apiNameList.find(
      apiName => apiName === name
    );
    if (isApiNameAlreadyProvided) {
      throw new Error(errorMessage.setter.nameIsAlreadyProvided(name));
    }
  };

  const throwErrorWhenUrlIsAlreadyUsed = url => {
    const apiNameList = Object.keys(apis);
    const alreadyProvidedApiName = apiNameList.filter(
      name => apis[name] === url
    )[0];
    if (alreadyProvidedApiName) {
      const alreadyProvidedApiUrl = apis[alreadyProvidedApiName];
      throw new Error(
        errorMessage.setter.urlIsAlreadyProvided(
          alreadyProvidedApiName,
          alreadyProvidedApiUrl
        )
      );
    }
  };

  const throwErrorWhenNameIsNotDefined = name => {
    if (!apis[name]) {
      throw new Error(errorMessage.getter.nameIsNotDefined(name));
    }
  };

  const throwErrorWhenBaseUrlIsNotProvided = url => {
    if (!url) {
      throw new Error(errorMessage.baseUrl.baseUrlIsNotProvided());
    }
  };

  const throwErrorWhenParamsIsNotObject = params => {
    if (params && !is(Object, params)) {
      throw new Error(errorMessage.params.whenParamsIsNotObject());
    }
  };

  const throwErrorWhenParamsIsNotFound = (params, url, name) => {
    const notMeetParams = Object.keys(params).filter(
      paramName => url.search(`:${paramName}`) <= -1
    );
    if (notMeetParams.length > 0) {
      throw new Error(
        errorMessage.params.whenParamsIsNotFound(notMeetParams, name)
      );
    }
  };

  const throwErrorWhenParamsIsNotMeet = (params, url, name) => {
    const paramNamesInUrl = (url.match(/:[a-zA-Z]+/g) || []).map(
      replace(':', '')
    );
    const providedParamNames = Object.keys(params).filter(
      paramName => params[paramName]
    );
    const missingParams = differenceWith(
      (a, b) => a === b,
      paramNamesInUrl,
      providedParamNames
    );

    if (missingParams.length > 0) {
      throw new Error(
        errorMessage.params.whenParamsIsNotMeet(missingParams, name)
      );
    }
  };

  return {
    throwErrorWhenNameOrUrlIsNotProvidedForSetter,
    throwErrorWhenNameIsNotProvidedForGetter,
    throwErrorWhenNameIsAlreadyUsed,
    throwErrorWhenUrlIsAlreadyUsed,
    throwErrorWhenNameIsNotDefined,
    throwErrorWhenBaseUrlIsNotProvided,
    throwErrorWhenParamsIsNotObject,
    throwErrorWhenParamsIsNotFound,
    throwErrorWhenParamsIsNotMeet
  };
};

const apiUrlProvider = isMock => {
  const apis = {};

  const mockApis = {};

  let baseUrl = '';

  let baseMockUrl = '';

  const validator = createValidator(apis);

  const addBaseUrlIfHavePrefixSlash = (url, isBaseMock) => {
    const havePrefixSlashRegex = /^\//;
    if (havePrefixSlashRegex.test(url)) {
      const prefixUrl = isBaseMock ? baseMockUrl : baseUrl;
      return prefixUrl + url;
    }
    return url;
  };

  const validateForGetter = name => {
    validator.throwErrorWhenNameIsNotProvidedForGetter(name);
    validator.throwErrorWhenNameIsNotDefined(name);
  };

  const validateForSetter = (name, url) => {
    validator.throwErrorWhenNameOrUrlIsNotProvidedForSetter(name, url);
    validator.throwErrorWhenNameIsAlreadyUsed(name);
    validator.throwErrorWhenUrlIsAlreadyUsed(url);
  };

  const validateForSetBaseUrl = url => {
    validator.throwErrorWhenBaseUrlIsNotProvided(url);
  };

  const validateForParams = (params, url, name) => {
    validator.throwErrorWhenParamsIsNotObject(params);
    validator.throwErrorWhenParamsIsNotFound(params, url, name);
    validator.throwErrorWhenParamsIsNotMeet(params, url, name);
  };

  const saveApi = (name, url, mockUrl) => {
    apis[name] = addBaseUrlIfHavePrefixSlash(url);
    mockApis[name] = addBaseUrlIfHavePrefixSlash(mockUrl || url, true);
  };

  const getApi = (name, params = {}, isMockOverided) => {
    if (isMock || isMockOverided) {
      return mockApis[name];
    }
    validateForParams(params, apis[name], name);
    return Object.keys(params).reduce(
      (acc, paramName) => acc.replace(`:${paramName}`, params[paramName]),
      apis[name]
    );
  };

  const setBaseUrl = (url, mockUrl) => {
    validateForSetBaseUrl(url);
    baseUrl = url.replace(/\/$/, '');
    baseMockUrl = mockUrl ? mockUrl.replace(/\/$/, '') : baseUrl;
  };

  const setter = (name, url, mockUrl) => {
    validateForSetter(name, url);
    saveApi(name, url, mockUrl);
  };

  const getter = (name, params) => {
    validateForGetter(name);
    return getApi(name, params, false);
  };

  const getterMockapi = (name, params) => {
    validateForGetter(name);
    return getApi(name, params, true);
  };

  return {
    setBaseUrl,
    set: setter,
    get: getter,
    getMock: getterMockapi
  };
};

export default apiUrlProvider;
