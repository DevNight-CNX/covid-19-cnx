export const getExpectedRequest = (url, body, contentType, token, i18n) => {
  return {
    url,
    headers: {
      'Content-Type': contentType,
      Authorization: `Bearer ${token}`,
      'x-localization': { i18n }
    },
    body: JSON.stringify(body)
  };
};
