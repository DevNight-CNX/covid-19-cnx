import getSafeLink from 'utils/getSafeLink';

export const OriginReference = ({ reference, isShowhttps }) => {
  const oldUrl = getSafeLink(reference);
  const url = new URL(oldUrl);
  return isShowhttps ? url.origin : url.hostname.replace('www.', '');
};
