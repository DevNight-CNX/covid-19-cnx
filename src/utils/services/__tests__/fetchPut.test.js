import { getExpectedRequest } from 'utils/test/fetch';
import { setToken } from 'services/auth/token';
import { fetchPut } from '../fetch';
import i18next from 'i18next';

describe('fetchPut', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  describe('request', () => {
    test('fetchPut should call fetch correctly when isAuth is false', () => {
      global.fetch.mockReturnValueOnce(
        Promise.resolve(
          new Response(
            JSON.stringify({
              message: 'success'
            })
          )
        )
      );

      fetchPut('mock-url', {
        name: 'John',
        lastname: 'Doe'
      });

      expect(global.fetch).toHaveBeenCalledTimes(1);

      const expectedRequest = getExpectedRequest(
        'mock-url',
        { name: 'John', lastname: 'Doe' },
        'application/json; charset=utf-8'
      );

      expect(global.fetch).toHaveBeenCalledWith(expectedRequest.url, {
        method: 'PUT',
        headers: {
          'Content-Type': expectedRequest.headers['Content-Type']
        },
        body: expectedRequest.body
      });
    });

    test('fetchPut should call fetch correctly when isAuth is true', () => {
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

      fetchPut(
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
        'en'
      );

      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });
});
