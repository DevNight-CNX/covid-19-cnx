const isNeedToCheckAuthorize = requiredAuthorizes =>
  requiredAuthorizes && requiredAuthorizes.length > 0;

const checkRequiredAuthorizes = (requiredAuthorizes, authorizes) =>
  requiredAuthorizes.every(requiredAutorize =>
    authorizes.includes(requiredAutorize)
  );

const checkAuthorize = (requiredAuthorizes = [], authorizes) => {
  if (isNeedToCheckAuthorize(requiredAuthorizes)) {
    return requiredAuthorizes.some(requiredAuthorize => {
      if (Array.isArray(requiredAuthorize)) {
        return checkRequiredAuthorizes(requiredAuthorize, authorizes);
      }
      return (authorizes || []).includes(requiredAuthorize);
    });
  }
  return true;
};

export default checkAuthorize;
