import jwt from 'jsonwebtoken';

const tokenKey = 'token';

export const getToken = () => localStorage.getItem(tokenKey);

export const setToken = value => localStorage.setItem(tokenKey, value);

export const removeToken = () => localStorage.removeItem(tokenKey);

export const getDataFronToken = () => {
  try {
    const token = getToken();
    const decoded = jwt.decode(token, { complete: true });
    return decoded.payload;
  } catch (e) {
    return '';
  }
};
