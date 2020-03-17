import { getExpectedRequest } from 'utils/test/fetch';
import { setToken } from 'services/auth/token';
import { fetchGet } from '../fetch';
import i18next from 'i18next';

describe('fetchGet', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  describe('request', () => {
    test('fetchGet should call fetch correctly when isAuth is false', () => {
      global.fetch.mockReturnValueOnce(
        Promise.resolve(
          new Response(
            JSON.stringify({
              message: 'success'
            })
          )
        )
      );

      fetchGet('http://mock-url', {
        name: 'John',
        lastname: 'Doe'
      });

      const expectedRequest = getExpectedRequest(
        'http://mock-url/?name=John&lastname=Doe'
      );

      expect(global.fetch).toHaveBeenCalledTimes(1);

      expect(global.fetch.mock.calls[0][0].href).toBe(expectedRequest.url);

      expect(global.fetch.mock.calls[0][1]).toEqual({
        method: 'GET',
        body: null,
        headers: {
          'x-localization': i18next.language
        }
      });
    });

    test('fetchGet should call fetch correctly when isAuth is true', () => {
      global.fetch.mockReturnValueOnce(
        Promise.resolve(
          new Response(
            JSON.stringify({
              message: 'success'
            })
          )
        )
      );

      setToken('mock-token');

      fetchGet(
        'http://mock-url',
        {
          name: 'John',
          lastname: 'Doe'
        },
        { isAuth: true },
        { i18n: true }
      );

      const expectedRequest = getExpectedRequest(
        'http://mock-url/?name=John&lastname=Doe'
      );

      expect(global.fetch).toHaveBeenCalledTimes(1);

      expect(global.fetch.mock.calls[0][0].href).toBe(expectedRequest.url);

      expect(global.fetch.mock.calls[0][1]).toEqual({
        method: 'GET',
        body: null,
        headers: {
          Authorization: 'Bearer mock-token',
          'x-localization': i18next.language
        }
      });
    });
  });
});
