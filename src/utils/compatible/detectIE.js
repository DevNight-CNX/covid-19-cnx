const detectIE = () => {
  const {
    navigator: { userAgent }
  } = window;

  const msie = userAgent.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return true;
  }

  const trident = userAgent.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    return true;
  }

  const edge = userAgent.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return true;
  }

  // other browser
  return false;
};

export default detectIE;
