import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga';
// import rootSaga from './sagas'

const middleware = applyMiddleware(logger)
const store = createStore(reducer, middleware)

export default store
