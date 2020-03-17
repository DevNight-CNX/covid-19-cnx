import composeValidate from '../composeValidate';
import { minLengthValidate, maxLengthValidate } from '../../validate';

describe('composeValidate', () => {
  test('compose validate functions', () => {
    const minAndMaxValidate = composeValidate(
      minLengthValidate(5),
      maxLengthValidate(9)
    );

    expect(minAndMaxValidate('123456')).toBe(true);
    expect(minAndMaxValidate('123')).toBe(false);
    expect(minAndMaxValidate('12345678910')).toBe(false);
  });
});
