import getKickToPath from '../getKickToPath';

const getMockPermission = (isAuth, isAuthorize) => ({
  isAuth,
  isAuthorize: isAuth && isAuthorize,
  isValid: isAuth && isAuthorize
});

const getMockPathString = () => '/island';

const getMockPathObject = (authen, authorize) => ({
  authen,
  authorize
});

describe('getKickToPath', () => {
  describe('should return correct path', () => {
    describe('if kickTo is string', () => {
      test('and authentication is invalid', () => {
        const actual = getKickToPath(
          getMockPathString(),
          getMockPermission(false, false)
        );
        expect(actual).toBe(getMockPathString());
      });

      test('and authorization is invalid', () => {
        const actual = getKickToPath(
          getMockPathString(),
          getMockPermission(true, false)
        );
        expect(actual).toBe(getMockPathString());
      });
    });

    describe('if kickTo is object', () => {
      describe('that provide only authen', () => {
        test('and authentication is invalid', () => {
          const actual = getKickToPath(
            getMockPathObject('/islandforauthen'),
            getMockPermission(false, false)
          );
          expect(actual).toBe('/islandforauthen');
        });

        test('and authorization is invalid', () => {
          const actual = getKickToPath(
            getMockPathObject('/islandforauthen'),
            getMockPermission(true, false)
          );
          expect(actual).toBe('/islandforauthen');
        });
      });

      describe('that provide only authorize', () => {
        test('and authentication is invalid', () => {
          const actual = getKickToPath(
            getMockPathObject(undefined, '/islandforauthorize'),
            getMockPermission(false, false)
          );
          expect(actual).toBe('');
        });

        test('and authorization is invalid', () => {
          const actual = getKickToPath(
            getMockPathObject(undefined, '/islandforauthorize'),
            getMockPermission(true, false)
          );
          expect(actual).toBe('/islandforauthorize');
        });
      });

      describe('that provide both authorize and authen', () => {
        test('and authentication is invalid', () => {
          const actual = getKickToPath(
            getMockPathObject('/islandforauthen', '/islandforauthorize'),
            getMockPermission(false, false)
          );
          expect(actual).toBe('/islandforauthen');
        });

        test('and authorization is invalid', () => {
          const actual = getKickToPath(
            getMockPathObject('/islandforauthen', '/islandforauthorize'),
            getMockPermission(true, false)
          );
          expect(actual).toBe('/islandforauthorize');
        });
      });
    });
  });
});
