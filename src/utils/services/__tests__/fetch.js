import cases from 'jest-in-case';
import { setToken } from 'services/auth/token';
import { fetchGet, fetchDelete, fetchPost, fetchPut } from '../fetch';
import i18next from 'i18next';

describe('fetch handle response', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  cases(
    'should handle success response that data is array correctly',
    async opts => {
      const mockData = [
        {
          name: 'John',
          lastname: 'Doe',
          age: 16
        },
        {
          name: 'Kent',
          lastname: 'Ddodd',
          age: 30
        },
        {
          name: 'Dan',
          lastname: 'Abramov',
          age: 26
        }
      ];

      const mockUrl = 'http://www.mock-api.com';
      const expectedResponse = new Response(JSON.stringify(mockData), {
        headers: {
          'content-type': 'application/json'
        }
      });

      await expectedResponse.json();

      global.fetch.mockReturnValue(
        Promise.resolve(
          new Response(JSON.stringify(mockData), {
            headers: {
              'content-type': 'application/json'
            }
          })
        )
      );

      const fetchResponse = await opts.fetch(mockUrl);

      expect(fetchResponse).toEqual({
        response: expectedResponse,
        data: mockData
      });
    },
    [
      { fetch: mockUrl => fetchGet(mockUrl) },
      { fetch: mockUrl => fetchPost(mockUrl) },
      { fetch: mockUrl => fetchPut(mockUrl) },
      { fetch: mockUrl => fetchDelete(mockUrl) }
    ]
  );

  cases(
    'should handle success response that data is object correctly',
    async opts => {
      const mockData = {
        name: 'John',
        lastname: 'Doe',
        age: 16
      };

      const mockUrl = 'http://www.mock-api.com';
      const expectedResponse = new Response(JSON.stringify(mockData), {
        headers: {
          'content-type': 'application/json'
        }
      });

      await expectedResponse.json();

      global.fetch.mockReturnValue(
        Promise.resolve(
          new Response(JSON.stringify(mockData), {
            headers: {
              'content-type': 'application/json'
            }
          })
        )
      );

      const fetchResponse = await opts.fetch(mockUrl);

      expect(fetchResponse).toEqual({
        response: expectedResponse,
        ...mockData
      });
    },
    [
      { fetch: mockUrl => fetchGet(mockUrl) },
      { fetch: mockUrl => fetchPost(mockUrl) },
      { fetch: mockUrl => fetchPut(mockUrl) },
      { fetch: mockUrl => fetchDelete(mockUrl) }
    ]
  );

  cases(
    'should handle error response correctly that data is object correctly',
    async opts => {
      const mockError = {
        name: 'John',
        lastname: 'Doe',
        age: 16
      };

      const mockUrl = 'http://www.mock-api.com';
      const expectedResponse = new Response(JSON.stringify(mockError), {
        status: 400,
        'content-type': 'application/json'
      });

      await expectedResponse.json();

      const mockResponse = new Response(JSON.stringify(mockError), {
        status: 400,
        'content-type': 'application/json'
      });

      global.fetch.mockReturnValue(Promise.resolve(mockResponse));

      await expect(opts.fetch(mockUrl)).rejects.toEqual({
        response: expectedResponse,
        ...mockError
      });
    },
    [
      { fetch: mockUrl => fetchGet(mockUrl) },
      { fetch: mockUrl => fetchPost(mockUrl) },
      { fetch: mockUrl => fetchPut(mockUrl) },
      { fetch: mockUrl => fetchDelete(mockUrl) }
    ]
  );

  cases(
    'should handle error response correctly that data is array correctly',
    async opts => {
      const mockError = [
        {
          name: 'John',
          lastname: 'Doe',
          age: 16
        },
        {
          name: 'Kent',
          lastname: 'Ddodd',
          age: 30
        },
        {
          name: 'Dan',
          lastname: 'Abramov',
          age: 26
        }
      ];

      const mockUrl = 'http://www.mock-api.com';
      const expectedResponse = new Response(JSON.stringify(mockError), {
        status: 400
      });

      await expectedResponse.json();

      const mockResponse = new Response(JSON.stringify(mockError), {
        status: 400,
        'content-type': 'application/json'
      });

      global.fetch.mockReturnValue(Promise.resolve(mockResponse));

      await expect(opts.fetch(mockUrl)).rejects.toEqual({
        response: expectedResponse,
        data: mockError
      });
    },
    [
      { fetch: mockUrl => fetchGet(mockUrl) },
      { fetch: mockUrl => fetchPost(mockUrl) },
      { fetch: mockUrl => fetchPut(mockUrl) },
      { fetch: mockUrl => fetchDelete(mockUrl) }
    ]
  );
});

cases(
  'should be able to provide overide token',
  async opts => {
    global.fetch = jest.fn();

    global.fetch.mockReturnValueOnce(
      Promise.resolve(
        new Response(
          JSON.stringify({
            message: 'success'
          }),
          {
            headers: {
              'content-type': 'application/json'
            }
          }
        )
      )
    );

    setToken('mock-token');

    opts.fetch('http://mock-url');

    expect(global.fetch).toHaveBeenCalledTimes(1);

    expect(global.fetch.mock.calls[0][1]).toEqual({
      method: opts.method,
      body: null,
      headers: {
        Authorization: `Bearer overide-token`,
        'Content-Type': opts.contentType
      }
    });
  },
  [
    {
      fetch: mockUrl =>
        fetchGet(mockUrl, null, {
          isAuth: true,
          i18n: true,
          token: 'overide-token'
        }),
      method: 'GET'
    },
    {
      fetch: mockUrl =>
        fetchPost(mockUrl, null, {
          isAuth: true,
          i18n: true,
          token: 'overide-token'
        }),
      method: 'POST',
      contentType: 'application/json; charset=utf-8'
    },
    {
      fetch: mockUrl =>
        fetchPut(mockUrl, null, {
          isAuth: true,
          i18n: true,
          token: 'overide-token'
        }),
      method: 'PUT',
      contentType: 'application/json; charset=utf-8'
    },
    {
      fetch: mockUrl =>
        fetchDelete(mockUrl, null, {
          isAuth: true,
          i18n: true,
          token: 'overide-token'
        }),
      method: 'DELETE'
    }
  ]
);
