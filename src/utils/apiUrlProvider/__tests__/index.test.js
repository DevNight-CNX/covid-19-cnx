import createApiUrlProvider from '../index';

describe('apiUrlProvider', () => {
  test('it return object correctly', () => {
    const apiUrlProvider = createApiUrlProvider();
    expect(typeof apiUrlProvider).toBe('object');
    expect(apiUrlProvider).toHaveProperty('set');
    expect(apiUrlProvider).toHaveProperty('get');
    expect(apiUrlProvider).toHaveProperty('getMock');
    expect(apiUrlProvider).toHaveProperty('setBaseUrl');
  });

  test(`set and get properties are function`, () => {
    const apiUrlProvider = createApiUrlProvider();
    expect(typeof apiUrlProvider.set).toBe('function');
    expect(typeof apiUrlProvider.get).toBe('function');
    expect(typeof apiUrlProvider.getMock).toBe('function');
    expect(typeof apiUrlProvider.setBaseUrl).toBe('function');
  });

  describe('setBaseUrl', () => {
    test(`it throw an error when url argument doesn't provided`, () => {
      const apiUrlProvider = createApiUrlProvider();
      const actual = () => apiUrlProvider.setBaseUrl();
      expect(actual).toThrowError(`base url isn't provided(first argumnent)`);
    });
  });

  describe('set method', () => {
    test('it return undefined', () => {
      const apiUrlProvider = createApiUrlProvider();
      const apiName = 'apiName';
      const apiUrl = 'www.google.com';
      const actual = apiUrlProvider.set(apiName, apiUrl);
      expect(actual).toBe(undefined);
    });
    test(`it throw an error when url argument doesn't provided`, () => {
      const apiUrlProvider = createApiUrlProvider();
      const apiName = 'apiName';
      const actual = () => {
        apiUrlProvider.set(apiName);
      };
      expect(actual).toThrowError(`api's url isn't provided(second argument)`);
    });
    test(`it throw an error when api's name argument doesn't provided`, () => {
      const apiUrlProvider = createApiUrlProvider();
      const actual = () => {
        const apiUrl = 'www.google.com';
        apiUrlProvider.set(null, apiUrl);
      };
      expect(actual).toThrowError(`api's name isn't provided(first argument)`);
    });
    test(`it throw an error when provide duplicated url`, () => {
      const apiUrlProvider = createApiUrlProvider();
      const apiUrl = 'www.google.com';
      const apiName = 'apiName';
      const apiName2 = 'apiName2';
      apiUrlProvider.set(apiName, apiUrl);
      const actual = () => {
        apiUrlProvider.set(apiName2, apiUrl);
      };
      expect(actual).toThrowError(
        `api's url "www.google.com" is already provided for "apiName"`
      );
    });
    test(`it throw an error when provide duplicated api's name`, () => {
      const apiUrlProvider = createApiUrlProvider();
      const apiUrl = 'www.google.com';
      const apiUrl2 = 'www.twitter.com';
      const apiName = 'apiName';
      apiUrlProvider.set(apiName, apiUrl);
      const actual = () => {
        apiUrlProvider.set(apiName, apiUrl2);
      };
      expect(actual).toThrowError(`api's name "apiName" is already provided`);
    });
  });

  describe('get method', () => {
    test(`it throw an error when not provide api's name argument`, () => {
      const apiUrlProvider = createApiUrlProvider();
      const actual = () => {
        apiUrlProvider.get();
      };
      expect(actual).toThrowError(`api's name isn't provided(first argument)`);
    });
    test(`it throw an error when trying get api's name that doesn't provided`, () => {
      const apiUrlProvider = createApiUrlProvider();
      const apiName = 'apiName';
      const actual = () => {
        apiUrlProvider.get(apiName);
      };
      expect(actual).toThrowError(`api's name "apiName" is not provided`);
    });
    describe(`it return url correctly`, () => {
      const apiName = 'apiName';
      const apiUrl = 'www.google.com';
      const mockApiUrl = 'www.mock.com';
      const setUpApiUrlProvider = (isMock, getIsMock) => {
        const apiUrlProvider = createApiUrlProvider(isMock);
        apiUrlProvider.set(apiName, apiUrl, mockApiUrl);
        let actual;
        if (getIsMock) {
          actual = apiUrlProvider.getMock(apiName);
        } else {
          actual = apiUrlProvider.get(apiName);
        }
        return actual;
      };
      test(`with default`, () => {
        const actual = setUpApiUrlProvider();
        expect(actual).toBe(apiUrl);
      });
      test(`with specify in createApiUrlProvider for real api`, () => {
        const actual = setUpApiUrlProvider(false);
        expect(actual).toBe(apiUrl);
      });
      test(`with specify in createApiUrlProvider for mock api`, () => {
        const actual = setUpApiUrlProvider(true);
        expect(actual).toBe(mockApiUrl);
      });

      test(`with specify in get method for mock api`, () => {
        const actual = setUpApiUrlProvider(false, true);
        expect(actual).toBe(mockApiUrl);
      });

      describe('with specify params in get method', () => {
        test('it return url correctly', () => {
          const apiName = 'apiName';
          const apiUrl = '/:id/books/:bookId';
          const apiUrlProvider = createApiUrlProvider();
          apiUrlProvider.set(apiName, apiUrl);
          const actual = apiUrlProvider.get(apiName, {
            id: 4,
            bookId: 10
          });
          expect(actual).toBe('/4/books/10');
        });

        test('it throw error when provide params argument with not object', () => {
          const apiName = 'apiName';
          const apiUrl = '/:id/books/:bookId';
          const apiUrlProvider = createApiUrlProvider();
          apiUrlProvider.set(apiName, apiUrl);
          const actual = () => apiUrlProvider.get(apiName, true);
          expect(actual).toThrowError('params argument need to be object');
        });

        test(`it throw error when provide params that's not in url`, () => {
          const apiName = 'apiName';
          const apiUrl = '/:id/books/:bookId';
          const apiUrlProvider = createApiUrlProvider();
          apiUrlProvider.set(apiName, apiUrl);
          const actual = () =>
            apiUrlProvider.get(apiName, {
              books: 4,
              bookId: 3
            });
          const actual2 = () =>
            apiUrlProvider.get(apiName, {
              books: 4,
              bookId: 3,
              cat: 'meow',
              dog: 'bok'
            });
          expect(actual).toThrowError(`there's no "books" param for "apiName"`);
          expect(actual2).toThrowError(
            `there's no "books", "cat", "dog" params for "apiName"`
          );
        });

        test(`it throw error when not provide params that's in url`, () => {
          const apiName = 'apiName';
          const apiUrl = '/:id/books/:bookId';
          const apiUrlProvider = createApiUrlProvider();
          apiUrlProvider.set(apiName, apiUrl);
          const actual = () =>
            apiUrlProvider.get(apiName, {
              bookId: 3
            });
          const actual2 = () => apiUrlProvider.get(apiName, {});
          expect(actual).toThrowError(
            `you didn't provide value for "id" param for "apiName"`
          );
          expect(actual2).toThrowError(
            `you didn't provide value for "id", "bookId" params for "apiName"`
          );
        });
      });

      describe('with specified base url', () => {
        test('and no trailing slash', () => {
          const apiName = 'apiName';
          const baseUrl = 'www.google.com';
          const apiUrl = '/list';
          const apiUrlProvider = createApiUrlProvider();
          apiUrlProvider.setBaseUrl(baseUrl);
          apiUrlProvider.set(apiName, apiUrl);
          const actual = apiUrlProvider.get(apiName);
          expect(actual).toBe(baseUrl + apiUrl);
        });
        test('and trailing slash and prefix slash url', () => {
          const apiName = 'apiName';
          const baseUrl = 'www.google.com/';
          const apiUrl = '/list';
          const apiUrlProvider = createApiUrlProvider();
          apiUrlProvider.setBaseUrl(baseUrl);
          apiUrlProvider.set(apiName, apiUrl);
          const actual = apiUrlProvider.get(apiName);
          expect(actual).toBe('www.google.com/list');
        });
        test('and trailing slash', () => {
          const apiName = 'apiName';
          const baseUrl = 'www.google.com/';
          const apiUrl = 'www.twitter.com';
          const apiUrlProvider = createApiUrlProvider();
          apiUrlProvider.setBaseUrl(baseUrl);
          apiUrlProvider.set(apiName, apiUrl);
          const actual = apiUrlProvider.get(apiName);
          expect(actual).toBe(apiUrl);
        });
        test('and trailing slash (mock api and provide baseMockUrl)', () => {
          const apiName = 'apiName';
          const baseUrl = 'www.google.com/';
          const baseMockUrl = 'www.mock.com';
          const apiUrl = '/get';
          const apiMockUrl = '/list';
          const apiUrlProvider = createApiUrlProvider(true);
          apiUrlProvider.setBaseUrl(baseUrl, baseMockUrl);
          apiUrlProvider.set(apiName, apiUrl, apiMockUrl);
          const actual = apiUrlProvider.get(apiName);
          expect(actual).toBe('www.mock.com/list');
        });
        test('and trailing slash (mock api and not provide baseMockUrl)', () => {
          const apiName = 'apiName';
          const baseUrl = 'www.google.com/';
          const apiUrl = '/get';
          const apiMockUrl = '/list';
          const apiUrlProvider = createApiUrlProvider(true);
          apiUrlProvider.setBaseUrl(baseUrl);
          apiUrlProvider.set(apiName, apiUrl, apiMockUrl);
          const actual = apiUrlProvider.get(apiName);
          expect(actual).toBe('www.google.com/list');
        });
      });
    });
  });
});
