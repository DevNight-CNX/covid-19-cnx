import { curry } from 'ramda';

export const provideErrorMessage = curry((errorMessage, isValid) =>
  !isValid ? errorMessage : ''
);

export const requireError = fieldName =>
  provideErrorMessage(`ต้องระบุ${fieldName}`);

export const minLengthError = (minRequired = 0) =>
  provideErrorMessage(`you need to provide at least ${minRequired}.`);

export const maxLengthError = (maxRequired = 0) =>
  provideErrorMessage(`Maximum ${maxRequired} characters.`);

export const minAndMaxLengthError = (fieldName, minRequired, maxRequired) =>
  provideErrorMessage(
    `${fieldName} must be ${minRequired}-${maxRequired} characters length.`
  );

export const emailError = provideErrorMessage(`Email address isn't valid.`);

export const wordCharacterError = fieldName =>
  provideErrorMessage(
    `${fieldName} can only contains letter, number, "-" and "_".`
  );

export const isSameError = provideErrorMessage(`Your password aren't match.`);

export const isUrlValidError = provideErrorMessage(`ลิงก์ฟอร์แมตไม่ถูกต้อง`);

export const passwordValidError = provideErrorMessage(
  `Password must be at least 9 characters includes lowwer case, upper case, numeric and symbols at least 1`
);
