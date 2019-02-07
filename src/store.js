import { combineReducers } from 'redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { authReducer, authRootSaga } from './models/Authentication'
import { userReducer, userRootSaga } from './models/User'
import { productsReducer, productsRootSaga } from './models/Products'
import { userProductReducer, userProductRootSaga } from './models/UserProduct'
import { cartReducer, cartRootSaga } from './models/ShoppingCart'

const sagaMiddleware = createSagaMiddleware()

const middleware = applyMiddleware(logger, sagaMiddleware)

const store = createStore(combineReducers({
  authentication: authReducer,
  user: userReducer,
  products: productsReducer,
  shoppingCart: cartReducer,
  userProducts: userProductReducer,
}), middleware)

const rootSagas = [
  authRootSaga,
  userRootSaga,
  productsRootSaga,
  userProductRootSaga,
  cartRootSaga,
]

rootSagas.forEach(sagaMiddleware.run)

export default store
