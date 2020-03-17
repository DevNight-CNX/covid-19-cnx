import composeValidators from '../composeValidators';
import { required, email } from '../../index';

describe('composeValidators', () => {
  test(`should show error message correctly if value isn't valid in one of validators`, () => {
    const validators = composeValidators(required('Username'), email);
    const actualCase1 = validators('');
    const actualCase2 = validators('test');

    const expectedCase1 = 'Username is required.';
    const expectedCase2 = `Email address isn't valid.`;

    expect(actualCase1).toBe(expectedCase1);
    expect(actualCase2).toBe(expectedCase2);
  });

  test(`shouldn't show error message if value pass all validators`, () => {
    const validators = composeValidators(required('Username'), email);
    const actualCase = validators('test@gmail.com');

    const expectedCase = '';

    expect(actualCase).toBe(expectedCase);
  });
});
