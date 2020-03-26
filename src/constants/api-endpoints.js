import env from 'utils/env';
import createApiUrlProvider from 'utils/apiUrlProvider';

const apiUrlProvider = createApiUrlProvider();

apiUrlProvider.setBaseUrl(env.getAPIUrl() || 'localhost');

export const GET_NEWS = 'GET_NEWS';

export const CREATE_REPORT = 'CREATE_REPORT';

export const GET_NEWS_BY_ID = 'GET_NEWS_BY_ID';

export const AUTHENTICATION = 'AUTHENTICATION';

export const SEND_MESSAGE = 'SEND_MESSAGE';

export const SUBSCRIBE_TOPIC = 'SUBSCRIBE_TOPIC';

export const UNSUBSCRIBE_TOPIC = 'UNSUBSCRIBE_TOPIC';

export const GET_REPORTS = 'GET_REPORTS';

export const GET_REPORT_BY_ID = 'GET_REPORT_BY_ID';

export const CASE = {
  LIST: 'CASE_LIST',
  SUMMARY: 'CASE_SUMMARY'
};

export const REPORT = {
  LIKE: 'REPORT_LIKE',
  UNLIKE: 'REPORT_UNLIKE',
  DISLIKE: 'REPORT_DISLIKE'
};

export const SUMMARY = 'SUMMARY';

export const SUMMARY_CNX = 'SUMMARY_CNX';

apiUrlProvider.set(GET_NEWS, '/news', 'https://demo6738459.mockable.io/');
apiUrlProvider.set(GET_NEWS_BY_ID, '/news/:id');
apiUrlProvider.set(AUTHENTICATION, '/authen');
apiUrlProvider.set(SEND_MESSAGE, '/fcm');
apiUrlProvider.set(SUBSCRIBE_TOPIC, '/subscribe');
apiUrlProvider.set(UNSUBSCRIBE_TOPIC, '/unsubscribe');
apiUrlProvider.set(CREATE_REPORT, '/report');
apiUrlProvider.set(
  CASE.LIST,
  '/cases',
  'https://demo0905840.mockable.io/cases'
);
apiUrlProvider.set(
  CASE.SUMMARY,
  '/summary',
  'https://demo0905840.mockable.io/cases'
);
apiUrlProvider.set(REPORT.LIKE, '/report/:id/like');
apiUrlProvider.set(REPORT.DISLIKE, '/report/:id/dislike');
apiUrlProvider.set(REPORT.UNLIKE, '/report/:id/unlike');
apiUrlProvider.set(GET_REPORTS, '/report');
apiUrlProvider.set(GET_REPORT_BY_ID, '/report/:id');

apiUrlProvider.set(SUMMARY, '/summary');

apiUrlProvider.set(SUMMARY_CNX, '/cnxSummary');

export default apiUrlProvider;
