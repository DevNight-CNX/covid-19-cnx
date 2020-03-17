import { compose } from 'ramda';
import {
  requiredValidate,
  minLengthValidate,
  maxLengthValidate,
  emailValidate,
  minAndMaxLengthValidate,
  wordCharacterValidate,
  isSameValidate,
  isUrlValidate,
  passwordValidValidate
} from './validate';
import {
  requireError,
  minLengthError,
  maxLengthError,
  emailError,
  minAndMaxLengthError,
  wordCharacterError,
  isSameError,
  isUrlValidError,
  passwordValidError
} from './errorMessage';
export { default as composeValidators } from './utils/composeValidators';

export const required = fieldName =>
  compose(
    requireError(fieldName),
    requiredValidate
  );

export const minLength = minRequired =>
  compose(
    minLengthError(minRequired),
    minLengthValidate(minRequired)
  );

export const maxLength = maxRequired =>
  compose(
    maxLengthError(maxRequired),
    maxLengthValidate(maxRequired)
  );

export const email = compose(
  emailError,
  emailValidate
);

export const minAndMaxLength = (fieldName, minRequired, maxRequired) =>
  compose(
    minAndMaxLengthError(fieldName, minRequired, maxRequired),
    minAndMaxLengthValidate(minRequired, maxRequired)
  );

export const wordCharacter = fieldName =>
  compose(
    wordCharacterError(fieldName),
    wordCharacterValidate
  );

export const isSame = comparedField => (value, values) =>
  compose(
    isSameError,
    isSameValidate
  )(value, values[comparedField]);

export const isUrlValid = compose(
  isUrlValidError,
  isUrlValidate
);

export const passwordValid = compose(
  passwordValidError,
  passwordValidValidate
);
