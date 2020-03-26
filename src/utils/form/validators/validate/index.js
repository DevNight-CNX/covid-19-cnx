/* eslint-disable no-useless-escape */

import { curry } from 'ramda';
import composeValidate from '../utils/composeValidate';

export const requiredValidate = value => {
  if (value) {
    if (typeof value === 'string') {
      return !!value.trim();
    }

    return !!value;
  } else {
    return false;
  }
};

export const minLengthValidate = curry((length, valueArg) => {
  const value = valueArg || '';
  return value.trim().length >= length;
});

export const maxLengthValidate = curry((length, valueArg) => {
  const value = valueArg || '';
  return value.trim().length <= length;
});

export const emailValidate = value => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(value);
};

export const minAndMaxLengthValidate = (minRequired, maxRequired) =>
  composeValidate(
    minLengthValidate(minRequired),
    maxLengthValidate(maxRequired)
  );

export const wordCharacterValidate = value => {
  const regex = /^[\w\-]+$/;
  return regex.test(value);
};

export const isSameValidate = (source, compared) => source === compared;

export const isUrlValidate = (url = '') => {
  if (!url) {
    return true;
  }
  const regex = /^[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?$/i;
  return regex.test(url.trim());
};

export const passwordValidValidate = password => {
  const regex = /(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*)(?=.*?[^\w\s])./i;
  return regex.test(password);
};
