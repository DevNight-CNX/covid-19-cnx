import checkAuthorize from './checkAuthorize';

const checkUserAgainstRoutePermission = (
  requiredAuthorizes,
  { isAuth, authorizes }
) => {
  const isAuthorize = isAuth && checkAuthorize(requiredAuthorizes, authorizes);
  return {
    isAuth,
    isAuthorize,
    isValid: isAuth && isAuthorize
  };
};

export default checkUserAgainstRoutePermission;
