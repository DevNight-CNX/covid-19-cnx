import checkAuthorize from '../checkAuthorize';

const mockRquiredAuthorizesCase1 = ['dev', 'manager', 'po'];
const mockRquiredAuthorizesCase2 = [['dev', 'manager'], ['dev', 'po']];
const mockRquiredAuthorizesCase3 = ['po', ['dev', 'manager'], 'admin'];

describe('checkAuthorize', () => {
  describe(`should belable to check user's authorize against required authorize`, () => {
    test('if required authorizes is "or" relation', () => {
      const isAuthorize = checkAuthorize(mockRquiredAuthorizesCase1, ['dev']);
      expect(isAuthorize).toBe(true);
    });

    test('if required authorizes is "and" relation', () => {
      const isAuthorizeCase1 = checkAuthorize(mockRquiredAuthorizesCase2, [
        'manager',
        'dev'
      ]);
      expect(isAuthorizeCase1).toBe(true);

      const isAuthorizeCase2 = checkAuthorize(mockRquiredAuthorizesCase2, [
        'dev',
        'po'
      ]);
      expect(isAuthorizeCase2).toBe(true);

      const isAuthorizeCase3 = checkAuthorize(mockRquiredAuthorizesCase2, [
        'po',
        'manager'
      ]);
      expect(isAuthorizeCase3).toBe(false);

      const isAuthorizeCase4 = checkAuthorize(mockRquiredAuthorizesCase2, [
        'dev'
      ]);
      expect(isAuthorizeCase4).toBe(false);

      const isAuthorizeCase5 = checkAuthorize(mockRquiredAuthorizesCase2, [
        'manager'
      ]);
      expect(isAuthorizeCase5).toBe(false);

      const isAuthorizeCase6 = checkAuthorize(mockRquiredAuthorizesCase2, [
        'po'
      ]);
      expect(isAuthorizeCase6).toBe(false);
    });

    test('if required authorizes is "or" and "and" relations', () => {
      const isAuthorizeCase1 = checkAuthorize(mockRquiredAuthorizesCase3, [
        'dev'
      ]);
      expect(isAuthorizeCase1).toBe(false);

      const isAuthorizeCase2 = checkAuthorize(mockRquiredAuthorizesCase3, [
        'dev',
        'admin'
      ]);
      expect(isAuthorizeCase2).toBe(true);

      const isAuthorizeCase3 = checkAuthorize(mockRquiredAuthorizesCase3, [
        'dev',
        'manager'
      ]);
      expect(isAuthorizeCase3).toBe(true);

      const isAuthorizeCase4 = checkAuthorize(mockRquiredAuthorizesCase3, [
        'po'
      ]);
      expect(isAuthorizeCase4).toBe(true);
    });
  });

  describe(`should return true if there's no required authorize`, () => {
    test(`if user's authorize is undefined`, () => {
      const isAuthorizeCase1 = checkAuthorize(undefined, undefined);

      expect(isAuthorizeCase1).toBe(true);

      const isAuthorizeCase2 = checkAuthorize(null, undefined);

      expect(isAuthorizeCase2).toBe(true);
    });

    test(`if user's authorize is empty array`, () => {
      const isAuthorize = checkAuthorize(undefined, []);

      expect(isAuthorize).toBe(true);
    });

    test(`if user has authorizes`, () => {
      const isAuthorize = checkAuthorize(undefined, ['dev']);

      expect(isAuthorize).toBe(true);
    });
  });
});
