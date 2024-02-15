import { Cookies } from 'react-cookie'

const cookies = new Cookies()
const accessToken = 'accessToken';
const refreshToken = 'refreshToken';

export const setAccessCookie = (value) => {
  return cookies.set(accessToken, value, { maxAge: 60 * 60, path: '/' });
};

export const setRefreshCookie = (value) => {
  return cookies.set(refreshToken, value, { maxAge: 60 * 60 * 24 * 14, path: '/' });
};

export const getAccessCookie = () => {
  return cookies.get(accessToken);
};

export const getRefreshCookie = () => {
  return cookies.get(refreshToken);
};


export const removeAccessCookie = () => {
  return cookies.remove(accessToken, {path: '/'});
};

export const removeRefreshCookie = () => {
  return cookies.remove(refreshToken, {path: '/'});
};
