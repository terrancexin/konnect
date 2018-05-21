import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import rootReducer from '../reducers';

// const middlewares = [thunk, logger];
const middlewares = [thunk];

const configureStore = (preloadedState) => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(...middlewares),
);

export default configureStore();
