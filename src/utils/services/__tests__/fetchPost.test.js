import { getExpectedRequest } from 'utils/test/fetch';
import { setToken } from 'services/auth/token';
import { fetchPost } from '../fetch';
import i18next from 'i18next';

describe('fetchPost', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  describe('request', () => {
    test('fetchPost should call fetch correctly when isAuth is false', () => {
      global.fetch.mockReturnValueOnce(
        Promise.resolve(
          new Response(
            JSON.stringify({
              message: 'success'
            })
          )
        )
      );

      fetchPost('mock-url', {
        name: 'John',
        lastname: 'Doe'
      });

      expect(global.fetch).toHaveBeenCalledTimes(1);

      const expectedRequest = getExpectedRequest(
        'mock-url',
        { name: 'John', lastname: 'Doe' },
        'application/json; charset=utf-8',
        i18next.language
      );

      expect(global.fetch).toHaveBeenCalledWith(expectedRequest.url, {
        method: 'POST',
        headers: {
          'Content-Type': expectedRequest.headers['Content-Type']
        },
        body: expectedRequest.body
      });
    });

    test('fetchPost should call fetch correctly when isAuth is true', () => {
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

      fetchPost(
        'mock-url',
        {
          name: 'John',
          lastname: 'Doe'
        },
        {
          isAuth: true
        },
        {
          i18n: true
        }
      );

      const expectedRequest = getExpectedRequest(
        'mock-url',
        { name: 'John', lastname: 'Doe' },
        'application/json; charset=utf-8',
        'mock-token',
        i18next.language
      );

      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });
});
