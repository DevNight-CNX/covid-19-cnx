import { getExpectedRequest } from 'utils/test/fetch';
import { setToken } from 'services/auth/token';
import { fetchDelete } from '../fetch';
import i18next from 'i18next';

describe('fetchDelete', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  describe('request', () => {
    test('fetchDelete should call fetch correctly when isAuth is false', () => {
      global.fetch.mockReturnValueOnce(
        Promise.resolve(
          new Response(
            JSON.stringify({
              message: 'success'
            })
          )
        )
      );

      fetchDelete('http://mock-url', {
        name: 'John',
        lastname: 'Doe'
      });

      const expectedRequest = getExpectedRequest(
        'http://mock-url/?name=John&lastname=Doe'
      );

      expect(global.fetch).toHaveBeenCalledTimes(1);

      expect(global.fetch.mock.calls[0][0].href).toBe(expectedRequest.url);

      expect(global.fetch.mock.calls[0][1]).toEqual({
        method: 'DELETE',
        body: null,
        headers: {}
      });
    });

    test('fetchDelete should call fetch correctly when isAuth is true', () => {
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

      fetchDelete(
        'http://mock-url',
        {
          name: 'John',
          lastname: 'Doe'
        },
        {
          isAuth: true
        }
      );

      const expectedRequest = getExpectedRequest(
        'http://mock-url/?name=John&lastname=Doe'
      );

      expect(global.fetch).toHaveBeenCalledTimes(1);

      expect(global.fetch.mock.calls[0][0].href).toBe(expectedRequest.url);

      expect(global.fetch.mock.calls[0][1]).toEqual({
        method: 'DELETE',
        body: null,
        headers: {
          Authorization: 'Bearer mock-token'
        }
      });
    });
  });
});
