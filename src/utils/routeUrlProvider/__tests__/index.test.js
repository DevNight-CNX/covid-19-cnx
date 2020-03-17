import createRouteUrlProvider from '../index';

describe('createRouteUrlProvider', () => {
  test('it return object correctly', () => {
    const routeUrlProvider = createRouteUrlProvider();
    expect(typeof routeUrlProvider).toBe('object');
    expect(routeUrlProvider).toHaveProperty('set');
    expect(routeUrlProvider).toHaveProperty('getForLink');
    expect(routeUrlProvider).toHaveProperty('getForRoute');
  });

  test(`set and get properties are function`, () => {
    const routeUrlProvider = createRouteUrlProvider();
    expect(typeof routeUrlProvider.set).toBe('function');
    expect(typeof routeUrlProvider.getForLink).toBe('function');
    expect(typeof routeUrlProvider.getForRoute).toBe('function');
  });

  describe('set method', () => {
    test('it return undefined', () => {
      const routeUrlProvider = createRouteUrlProvider();
      const routeName = 'routeName';
      const apiUrl = 'www.google.com';
      const actual = routeUrlProvider.set(routeName, apiUrl);
      expect(actual).toBe(undefined);
    });

    test(`it throw an error when url argument doesn't provided`, () => {
      const routeUrlProvider = createRouteUrlProvider();
      const routeName = 'routeName';
      const actual = () => {
        routeUrlProvider.set(routeName);
      };
      expect(actual).toThrowError(
        `route's url isn't provided(second argument)`
      );
    });

    test(`it throw an error when route's name argument doesn't provided`, () => {
      const routeUrlProvider = createRouteUrlProvider();
      const actual = () => {
        const routeUrl = '/home';
        routeUrlProvider.set(null, routeUrl);
      };
      expect(actual).toThrowError(
        `route's name isn't provided(first argument)`
      );
    });

    test(`it throw an error when provide duplicated url`, () => {
      const routeUrlProvider = createRouteUrlProvider();
      const routeUrl = '/home';
      const routeName = 'home';
      const routeName2 = 'home2';
      routeUrlProvider.set(routeName, routeUrl);
      const actual = () => {
        routeUrlProvider.set(routeName2, routeUrl);
      };
      expect(actual).toThrowError(
        `route's url "/home" is already provided for "home"`
      );
    });
    test(`it throw an error when provide duplicated route's name`, () => {
      const routeUrlProvider = createRouteUrlProvider();
      const routeUrl = '/home';
      const routeUrl2 = '/login';
      const routeName = 'home';
      routeUrlProvider.set(routeName, routeUrl);
      const actual = () => {
        routeUrlProvider.set(routeName, routeUrl2);
      };
      expect(actual).toThrowError(`route's name "home" is already provided`);
    });
  });

  describe('getForLink method', () => {
    describe('with specify params in get method', () => {
      test('it return url correctly', () => {
        const routeName = 'user-detail';
        const routeUrl = '/group/:groupId/user/:userId';
        const routeUrlProvider = createRouteUrlProvider();
        routeUrlProvider.set(routeName, routeUrl);
        const actual = routeUrlProvider.getForLink(routeName, {
          groupId: 4,
          userId: 10
        });
        expect(actual).toBe('/group/4/user/10');
      });

      test('it throw error when provide params argument with not object', () => {
        const routeName = 'user-detail';
        const routeUrl = '/group/:groupId/user/:userId';
        const routeUrlProvider = createRouteUrlProvider();
        routeUrlProvider.set(routeName, routeUrl);
        const actual = () => routeUrlProvider.getForLink(routeName, true);
        expect(actual).toThrowError('params argument need to be object');
      });

      test(`it throw error when provide params that's not in url`, () => {
        const routeName = 'user-detail';
        const routeUrl = '/group/:groupId/user/:userId';
        const routeUrlProvider = createRouteUrlProvider();
        routeUrlProvider.set(routeName, routeUrl);
        const actual = () =>
          routeUrlProvider.getForLink(routeName, {
            groupId: 4,
            cat: 3
          });
        const actual2 = () =>
          routeUrlProvider.getForLink(routeName, {
            books: 4,
            groupId: 3,
            cat: 'meow',
            dog: 'bok'
          });
        expect(actual).toThrowError(`there's no "cat" param for "user-detail"`);
        expect(actual2).toThrowError(
          `there's no "books", "cat", "dog" params for "user-detail"`
        );
      });

      test(`it throw error when not provide params that's in url`, () => {
        const routeName = 'user-detail';
        const routeUrl = '/group/:groupId/user/:userId';
        const routeUrlProvider = createRouteUrlProvider();
        routeUrlProvider.set(routeName, routeUrl);
        const actual = () =>
          routeUrlProvider.getForLink(routeName, {
            groupId: 3
          });
        const actual2 = () => routeUrlProvider.getForLink(routeName, {});
        expect(actual).toThrowError(
          `you didn't provide value for "userId" param for "user-detail"`
        );
        expect(actual2).toThrowError(
          `you didn't provide value for "groupId", "userId" params for "user-detail"`
        );
      });
    });
  });

  describe('getForRoute method', () => {
    describe('with specify params in get method', () => {
      test('it throw error when trying provide params', () => {
        const routeName = 'user-detail';
        const routeUrl = '/group/:groupId/user/:userId';
        const routeUrlProvider = createRouteUrlProvider();
        routeUrlProvider.set(routeName, routeUrl);
        const actual = () =>
          routeUrlProvider.getForRoute(routeName, {
            groupId: 3
          });

        expect(actual).toThrowError(
          `you can't provide params's value for getForRoute method`
        );
      });

      test('it can get route url', () => {
        const routeName = 'user-detail';
        const routeUrl = '/group/:groupId/user/:userId';
        const routeUrlProvider = createRouteUrlProvider();
        routeUrlProvider.set(routeName, routeUrl);

        const actual = routeUrlProvider.getForRoute(routeName);
        expect(actual).toBe(`/group/:groupId/user/:userId`);
      });
    });
  });

  describe('getFor* method', () => {
    test(`it throw an error when not provide route's name argument`, () => {
      const routeUrlProvider = createRouteUrlProvider();
      const actualForLink = () => {
        routeUrlProvider.getForLink();
      };
      expect(actualForLink).toThrowError(
        `route's name isn't provided(first argument)`
      );

      const actualForRoute = () => {
        routeUrlProvider.getForRoute();
      };
      expect(actualForRoute).toThrowError(
        `route's name isn't provided(first argument)`
      );
    });

    test(`it throw an error when trying get route's name that doesn't provided`, () => {
      const routeUrlProvider = createRouteUrlProvider();
      const routeName = 'home';
      const actualForLink = () => {
        routeUrlProvider.getForLink(routeName);
      };
      expect(actualForLink).toThrowError(`route's name "home" is not provided`);

      const actualForRoute = () => {
        routeUrlProvider.getForRoute(routeName);
      };
      expect(actualForRoute).toThrowError(
        `route's name "home" is not provided`
      );
    });

    test(`get url without params`, () => {
      const routeName = 'homepage';
      const routeUrl = '/home';
      const routeUrlProvider = createRouteUrlProvider();
      routeUrlProvider.set(routeName, routeUrl);
      const actualForLink = routeUrlProvider.getForLink(routeName);
      const actualForRoute = routeUrlProvider.getForRoute(routeName);
      expect(actualForRoute).toBe(routeUrl);
      expect(actualForLink).toBe(routeUrl);
    });
  });
});
