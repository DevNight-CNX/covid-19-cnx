const getAuthKickToPath = kickTo => {
  if (kickTo.authen) {
    return kickTo.authen;
  }
  return '';
};

const getAuthorizeKickToPath = kickTo => {
  if (kickTo.authorize) {
    return kickTo.authorize;
  }
  return getAuthKickToPath(kickTo);
};

const getKickToPath = (kickTo, permission) => {
  if (typeof kickTo === 'string') {
    return kickTo;
  }
  if (typeof kickTo === 'object') {
    if (!permission.isAuth) {
      return getAuthKickToPath(kickTo);
    }
    return getAuthorizeKickToPath(kickTo);
  }
  return '';
};

export default getKickToPath;
