import checkUserAgainstRoutePermission from '../checkUserAgainstRoutePermission';

const getMockAuthRouter = (isAuth = false, authorizes = []) => ({
  isAuth,
  authorizes
});

describe('checkUserAgainstRoutePermission', () => {
  test('should return correctly if user have authen and authorize', () => {
    const actual = checkUserAgainstRoutePermission(
      ['dev'],
      getMockAuthRouter(true, ['dev'])
    );
    expect(actual.isValid).toBe(true);
    expect(actual.isAuth).toBe(true);
    expect(actual.isAuthorize).toBe(true);
  });

  describe('should return correctly if user have', () => {
    test('only authen', () => {
      const actual = checkUserAgainstRoutePermission(
        ['dev'],
        getMockAuthRouter(true, [])
      );
      expect(actual.isValid).toBe(false);
      expect(actual.isAuth).toBe(true);
      expect(actual.isAuthorize).toBe(false);
    });

    test('only authorize', () => {
      const actual = checkUserAgainstRoutePermission(
        ['dev'],
        getMockAuthRouter(false, ['dev'])
      );
      expect(actual.isValid).toBe(false);
      expect(actual.isAuth).toBe(false);
      expect(actual.isAuthorize).toBe(false);
    });
  });
});
