import env from 'utils/env';
import createApiUrlProvider from 'utils/apiUrlProvider';

const apiUrlProvider = createApiUrlProvider();

apiUrlProvider.setBaseUrl(env.getAPIUrl() || 'localhost');

export const GET_NEWS = 'GET_NEWS';

export const AUTHENTICATION = 'AUTHENTICATION';

export const SEND_MESSAGE = 'SEND_MESSAGE';

export const SUBSCRIBE_TOPIC = 'SUBSCRIBE_TOPIC';

export const UNSUBSCRIBE_TOPIC = 'UNSUBSCRIBE_TOPIC';

apiUrlProvider.set(GET_NEWS, '/news');
apiUrlProvider.set(AUTHENTICATION, '/authen');
apiUrlProvider.set(SEND_MESSAGE, '/fcm');
apiUrlProvider.set(SUBSCRIBE_TOPIC, '/subscribe');
apiUrlProvider.set(UNSUBSCRIBE_TOPIC, '/unsubscribe');

export default apiUrlProvider;
