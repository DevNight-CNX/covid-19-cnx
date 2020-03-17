import { is, replace, differenceWith } from 'ramda';

const createValidator = routes => {
  const errorMessage = {
    setter: {
      notProvideName: () => `route's name isn't provided(first argument)`,
      notProvideUrl: () => `route's url isn't provided(second argument)`,
      nameIsAlreadyProvided: name =>
        `route's name "${name}" is already provided`,
      urlIsAlreadyProvided: (name, url) =>
        `route's url "${url}" is already provided for "${name}"`
    },
    getter: {
      nameIsNotDefined: name => `route's name "${name}" is not provided`,
      notProvideName: () => `route's name isn't provided(first argument)`
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
          .join(', ')} ${params.length > 1 ? 'params' : 'param'} for "${name}"`,
      whenParamsHasValueForGetRoute: () =>
        `you can't provide params's value for getForRoute method`
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
    const apiNameList = Object.keys(routes);
    const isApiNameAlreadyProvided = apiNameList.find(
      apiName => apiName === name
    );
    if (isApiNameAlreadyProvided) {
      throw new Error(errorMessage.setter.nameIsAlreadyProvided(name));
    }
  };

  const throwErrorWhenUrlIsAlreadyUsed = url => {
    const apiNameList = Object.keys(routes);
    const alreadyProvidedApiName = apiNameList.filter(
      name => routes[name] === url
    )[0];
    if (alreadyProvidedApiName) {
      const alreadyProvidedApiUrl = routes[alreadyProvidedApiName];
      throw new Error(
        errorMessage.setter.urlIsAlreadyProvided(
          alreadyProvidedApiName,
          alreadyProvidedApiUrl
        )
      );
    }
  };

  const throwErrorWhenNameIsNotDefined = name => {
    if (!routes[name]) {
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

  const throwErrorWhenParamsHasValue = params => {
    if (params) {
      throw new Error(errorMessage.params.whenParamsHasValueForGetRoute());
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
    throwErrorWhenParamsIsNotMeet,
    throwErrorWhenParamsHasValue
  };
};

const routeUrlProvider = () => {
  const routes = {};

  const validator = createValidator(routes);

  const validateForGetter = name => {
    validator.throwErrorWhenNameIsNotProvidedForGetter(name);
    validator.throwErrorWhenNameIsNotDefined(name);
  };

  const validateForSetter = (name, url) => {
    validator.throwErrorWhenNameOrUrlIsNotProvidedForSetter(name, url);
    validator.throwErrorWhenNameIsAlreadyUsed(name);
    validator.throwErrorWhenUrlIsAlreadyUsed(url);
  };

  const validateForParams = (params, url, name) => {
    validator.throwErrorWhenParamsIsNotObject(params);
    validator.throwErrorWhenParamsIsNotFound(params, url, name);
    validator.throwErrorWhenParamsIsNotMeet(params, url, name);
  };

  const validateForRouteGetter = params => {
    validator.throwErrorWhenParamsHasValue(params);
  };

  const saveRoute = (name, url) => {
    routes[name] = url;
  };

  const getPathForLink = (name, params = {}) => {
    validateForParams(params, routes[name], name);
    return Object.keys(params).reduce(
      (acc, paramName) => acc.replace(`:${paramName}`, params[paramName]),
      routes[name]
    );
  };

  const getPathForRoute = name => {
    return routes[name];
  };

  const setter = (name, url) => {
    validateForSetter(name, url);
    saveRoute(name, url);
  };

  const getterForLink = (name, params) => {
    validateForGetter(name);
    return getPathForLink(name, params);
  };

  const getterForRoute = (name, params) => {
    validateForGetter(name);
    validateForRouteGetter(params);
    return getPathForRoute(name);
  };

  return {
    set: setter,
    getForLink: getterForLink,
    getForRoute: getterForRoute
  };
};

export default routeUrlProvider;
