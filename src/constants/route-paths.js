import createRouteUrlProvider from 'utils/routeUrlProvider';

export const HOME = 'HOME';

export const EXAMPLE = 'EXAMPLE';

export const EXAMPLE_TODO_LIST = 'EXAMPLE_TODO_LIST';

export const EXAMPLE_GITHUB_USER_LIST = 'EXAMPLE_GITHUB_USER_LIST';

export const EXAMPLE_COUNTER = 'EXAMPLE_COUNTER';

export const EXAMPLE_FINAL_FORM = 'EXAMPLE_FINAL_FORM';

const routeUrlProvider = createRouteUrlProvider();

routeUrlProvider.set(HOME, '/');

routeUrlProvider.set(EXAMPLE, '/example');
routeUrlProvider.set(EXAMPLE_TODO_LIST, '/todo-with-redux');
routeUrlProvider.set(EXAMPLE_GITHUB_USER_LIST, '/github-user-list');
routeUrlProvider.set(EXAMPLE_COUNTER, '/counter');
routeUrlProvider.set(EXAMPLE_FINAL_FORM, '/final-form');

export default routeUrlProvider;
