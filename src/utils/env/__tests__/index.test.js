import mockConsole from 'jest-mock-console';
import env from '../index';

describe('env', () => {
  let tmpEnvServer;
  let tmpEnvServiceGoogleMapKey;
  let tmpEnvApiUrl;

  const mockServerEnv = 'localhost_mock';
  const mockServiceGoogleMapKey = 'googlemapkey_mock';
  const mockApiUrl = 'apiurl_mock';

  beforeAll(() => {
    tmpEnvServer = process.env.REACT_APP_SERVER;
    tmpEnvServiceGoogleMapKey = process.env.REACT_APP_SERVICE_GOOGLE_MAP_KEY;
    tmpEnvApiUrl = process.env.REACT_APP_API_URL;

    process.env.REACT_APP_SERVER = mockServerEnv;
    process.env.REACT_APP_SERVICE_GOOGLE_MAP_KEY = mockServiceGoogleMapKey;
    process.env.REACT_APP_API_URL = mockApiUrl;
  });

  afterAll(() => {
    process.env.REACT_APP_SERVER = tmpEnvServer;
    process.env.REACT_APP_SERVICE_GOOGLE_MAP_KEY = tmpEnvServiceGoogleMapKey;
    process.env.REACT_APP_API_URL = tmpEnvApiUrl;
  });

  describe('getEnv', () => {
    describe('should return env correctly', () => {
      test('for REACT_APP_SERVER', () => {
        const actual = env.get('SERVER');

        expect(actual).toBe(mockServerEnv);
      });

      test('for REACT_APP_SERVICE_*', () => {
        const actual = env.get('SERVICE_GOOGLE_MAP_KEY');

        expect(actual).toBe(mockServiceGoogleMapKey);
      });

      test('for REACT_APP_API_URL', () => {
        const actual = env.get('API_URL');

        expect(actual).toBe(mockApiUrl);
      });
    });

    test(`warning if there's no specified env`, () => {
      const restoreConsole = mockConsole();
      env.get('NOT_EXISTING');
      expect(console.error).toHaveBeenCalledTimes(1);
      restoreConsole();
    });
  });

  describe('isServerLocalhost', () => {
    test(`should return true if server env is set to "localhost"`, () => {
      process.env.REACT_APP_SERVER = 'localhost';
      const actual = env.isServerLocalhost();
      expect(actual).toBe(true);
    });
  });

  describe('isServerDev', () => {
    test(`should return true if server env is set to "development"`, () => {
      process.env.REACT_APP_SERVER = 'development';
      const actual = env.isServerDev();
      expect(actual).toBe(true);
    });
  });

  describe('isServerStaging', () => {
    test(`should return true if server env is set to "staging"`, () => {
      process.env.REACT_APP_SERVER = 'staging';
      const actual = env.isServerStaging();
      expect(actual).toBe(true);
    });
  });

  describe('isServerProduction', () => {
    test(`should return true if server env is set to "production"`, () => {
      process.env.REACT_APP_SERVER = 'production';
      const actual = env.isServerProduction();
      expect(actual).toBe(true);
    });
  });

  describe('getAPIUrl', () => {
    test('should return api url', () => {
      const actual = env.getAPIUrl();

      expect(actual).toBe(mockApiUrl);
    });
  });
});
