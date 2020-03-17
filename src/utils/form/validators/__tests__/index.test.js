import {
  required,
  minLength,
  maxLength,
  email,
  minAndMaxLength,
  wordCharacter
} from '../index';

describe('validator', () => {
  describe('required', () => {
    test('should return error message correctly for invalid case', () => {
      const actualEmptyString = required('Username')('');
      const actualUndefined = required('Username')(undefined);
      const actualNull = required('Username')(null);

      const expected = 'Username is required.';

      expect(actualEmptyString).toBe(expected);
      expect(actualUndefined).toBe(expected);
      expect(actualNull).toBe(expected);
    });

    test('should return empty string for valid case', () => {
      const actualIdeal = required('Username')('john');
      const actualZeroString = required('Username')('0');
      const actualFalseString = required('Username')('false');

      const expected = '';

      expect(actualIdeal).toBe(expected);
      expect(actualZeroString).toBe(expected);
      expect(actualFalseString).toBe(expected);
    });
  });

  describe('minLength', () => {
    test('should return error message if value is less than required length', () => {
      const actualJohn = minLength(5)('john');
      const actualEmptyString = minLength(5)('');
      const actualSpace = minLength(5)('  j      ');
      const actualUndefined = minLength(5)(undefined);

      const expected = 'you need to provide at least 5.';

      expect(actualJohn).toBe(expected);
      expect(actualEmptyString).toBe(expected);
      expect(actualSpace).toBe(expected);
      expect(actualUndefined).toBe(expected);
    });

    test('should return empty string if value is more than or equal required length', () => {
      const actualCase = minLength(5)('johny');
      const actualCase2 = minLength(5)('my johny');
      const actualCase3 = minLength(5)('my do');

      const expected = '';

      expect(actualCase).toBe(expected);
      expect(actualCase2).toBe(expected);
      expect(actualCase3).toBe(expected);
    });
  });

  describe('maxLength', () => {
    test('should return error message if value is more than max length', () => {
      const actualCase = maxLength(8)('johnycash');
      const actualCase2 = maxLength(8)('my johnny');

      const expected = 'Maximum 8 characters.';

      expect(actualCase).toBe(expected);
      expect(actualCase2).toBe(expected);
    });

    test('should return empty string if value is less than or equal max length', () => {
      const actualCase = maxLength(8)('johnybay');
      const actualCase2 = maxLength(8)('            john        ');
      const actualCase3 = maxLength(8)(undefined);
      const actualCase4 = maxLength(8)('');

      const expected = '';

      expect(actualCase).toBe(expected);
      expect(actualCase2).toBe(expected);
      expect(actualCase3).toBe(expected);
      expect(actualCase4).toBe(expected);
    });
  });

  describe('email', () => {
    test(`should return error message if value isn't valid email`, () => {
      const actualCase1 = email('test');
      const actualCase2 = email('test@');
      const actualCase3 = email('test@test@test.com');

      const expected = `Email address isn't valid.`;

      expect(actualCase1).toBe(expected);
      expect(actualCase2).toBe(expected);
      expect(actualCase3).toBe(expected);
    });

    test('should return empty string if value is valid email', () => {
      const actualCase1 = email('test@gmail.com');
      const actualCase2 = email('john@hotmail.com');
      const actualCase3 = email('admin@scito.com');

      const expected = '';

      expect(actualCase1).toBe(expected);
      expect(actualCase2).toBe(expected);
      expect(actualCase3).toBe(expected);
    });
  });

  describe('minAndMaxLength', () => {
    test('should return error message if value are less than or more than specified range', () => {
      const validate = minAndMaxLength('Username', 3, 20);
      expect(validate('pt')).toBe('Username must be 3-20 characters length.');
      expect(validate('LouisJohnDoe sur jordan')).toBe(
        'Username must be 3-20 characters length.'
      );
    });

    test('should return empty string if value is valid', () => {
      const validate = minAndMaxLength('Username', 3, 20);

      expect(validate('Louis')).toBe('');
    });
  });

  describe('wordCharacterValidate', () => {
    test('should return error message if value contains other than letters, number, - and _', () => {
      const actualCase1 = wordCharacter('Username')('Napat$');
      const actualCase2 = wordCharacter('Username')('Napat123++');
      const actualCase3 = wordCharacter('Username')('#Napat123');

      const errorMessage =
        'Username can only contains letter, number, "-" and "_".';

      expect(actualCase1).toBe(errorMessage);
      expect(actualCase2).toBe(errorMessage);
      expect(actualCase3).toBe(errorMessage);
    });

    test('should return empty string if value is valud', () => {
      const actualCase1 = wordCharacter('Username')('Napat');
      const actualCase2 = wordCharacter('Username')('Napat_123');
      const actualCase3 = wordCharacter('Username')('Napat-123');

      const errorMessage = '';

      expect(actualCase1).toBe(errorMessage);
      expect(actualCase2).toBe(errorMessage);
      expect(actualCase3).toBe(errorMessage);
    });
  });
});
