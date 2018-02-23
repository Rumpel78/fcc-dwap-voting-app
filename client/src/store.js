/* global window */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers/root';

export const history = createHistory();

const initialState = { user: { name: 'test' } };

const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware(history),
];

// Configure the logger middleware
const logger = createLogger({
  level: 'info',
  collapsed: true,
});

if (process.env.NODE_ENV === 'development') {
  if (window.devToolsExtension) {
    const { devToolsExtension } = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }
  middleware.push(logger);
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers,
);

export default store;
