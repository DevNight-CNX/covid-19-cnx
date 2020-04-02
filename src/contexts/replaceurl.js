import getSafeLink from 'utils/getSafeLink';

export const originReference = ({ reference, isShowhttps }) => {
  try {
    const oldUrl = getSafeLink(reference);
    const url = new URL(oldUrl);
    return isShowhttps ? url.origin : url.hostname.replace('www.', '');
  } catch (e) {
    return reference;
  }
};
