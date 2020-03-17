const composeValidators = (...validators) => (...args) =>
  validators.reduce((errorMessage, validator) => {
    if (errorMessage) {
      return errorMessage;
    }
    return validator(...args);
  }, '');

export default composeValidators;
