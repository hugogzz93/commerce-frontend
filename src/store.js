import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import {authReducer, authRootSaga} from './models/Authentication'
import { userReducer, userRootSaga } from './models/User'

const sagaMiddleware = createSagaMiddleware()

const middleware = applyMiddleware(logger, sagaMiddleware)

const store = createStore(combineReducers({
  authentication: authReducer,
  user: userReducer
}), middleware)

const rootSagas = [
  authRootSaga,
  userRootSaga
]

rootSagas.forEach(sagaMiddleware.run)

export default store
