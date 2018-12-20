import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import {authReducer, authRootSaga} from './models/Authentication'
// import { navReducer } from './models/Navigation'

const sagaMiddleware = createSagaMiddleware()

const middleware = applyMiddleware(logger, sagaMiddleware)

const store = createStore(combineReducers({
  authentication: authReducer
  // navigation: navReducer
}), middleware)

const rootSagas = [
  authRootSaga
]

rootSagas.forEach(sagaMiddleware.run)

export default store
