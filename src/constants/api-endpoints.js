import env from 'utils/env';
import createApiUrlProvider from 'utils/apiUrlProvider';

const apiUrlProvider = createApiUrlProvider();

apiUrlProvider.setBaseUrl(env.getAPIUrl() || 'localhost');

export const GET_NEWS = 'GET_NEWS';

export const AUTHENTICATION = 'AUTHENTICATION';

export const SEND_MESSAGE = 'SEND_MESSAGE';

export const SUBSCRIBE_TOPIC = 'SUBSCRIBE_TOPIC';

export const UNSUBSCRIBE_TOPIC = 'UNSUBSCRIBE_TOPIC';

export const CASE = {
  LIST: 'LIST_CASE'
};

apiUrlProvider.set(GET_NEWS, '/news');
apiUrlProvider.set(AUTHENTICATION, '/authen');
apiUrlProvider.set(SEND_MESSAGE, '/fcm');
apiUrlProvider.set(SUBSCRIBE_TOPIC, '/subscribe');
apiUrlProvider.set(UNSUBSCRIBE_TOPIC, '/unsubscribe');
apiUrlProvider.set(
  CASE.LIST,
  '/cases',
  'https://demo0905840.mockable.io/cases'
);

export default apiUrlProvider;
