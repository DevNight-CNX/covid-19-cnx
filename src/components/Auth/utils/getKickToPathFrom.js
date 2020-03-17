import getKickToPath from './getKickToPath';

const getKickToPathFrom = (authRouterKickTo, routeKickTo, permisson) => {
  const kickToFromRoute = getKickToPath(routeKickTo, permisson);
  if (kickToFromRoute) {
    return kickToFromRoute;
  }
  return getKickToPath(authRouterKickTo, permisson);
};

export default getKickToPathFrom;
