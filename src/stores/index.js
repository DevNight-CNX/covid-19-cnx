import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { Iterable } from 'immutable';
import envHelper from 'utils/env';
import rootReducer from './rootReducer';
import rootEpic from './rootEpic';

const loggerMiddleware = createLogger({
  collapsed: true,
  stateTransformer: state => {
    const newState = {};
    for (const i of Object.keys(state)) {
      if (Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    }
    return newState;
  }
});

const epicMiddleware = createEpicMiddleware();

const getMiddlewares = () => {
  const baseMiddlewares = [epicMiddleware];
  return envHelper.isServerLocalhost() || envHelper.isServerDev()
    ? [...baseMiddlewares, loggerMiddleware]
    : baseMiddlewares;
};

const getStore = preloadState => {
  const store = createStore(
    rootReducer,
    preloadState,
    applyMiddleware(...getMiddlewares())
  );
  epicMiddleware.run(rootEpic);
  return store;
};

export default getStore;
