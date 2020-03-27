export const OriginReference = ({ reference, isShowhttps }) => {
  const oldUrl = reference;
  const url = new URL(oldUrl);
  return isShowhttps ? url.origin : url.hostname.replace('www.', '');
};
