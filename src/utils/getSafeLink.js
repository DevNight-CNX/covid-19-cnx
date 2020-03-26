const getSafeLink = url => {
  if (!/^https?:\/\//i.test(url)) {
    return 'https://' + url;
  } else {
    return url;
  }
};

export default getSafeLink;
