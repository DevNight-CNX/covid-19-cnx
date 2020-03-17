const composeValidate = (...validates) => (...args) =>
  validates.reduce((isValid, validate) => {
    if (!isValid) {
      return isValid;
    }
    return validate(...args);
  }, true);

export default composeValidate;
