import { parse } from '../qs';

describe('qs', () => {
  test('should parse search correctly', () => {
    expect(parse('?name=john&lastname=doe')).toEqual({
      name: 'john',
      lastname: 'doe'
    });
  });
});
