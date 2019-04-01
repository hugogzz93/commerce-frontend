import { combineReducers } from "redux";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import { authReducer, authRootSaga } from "./models/Authentication";
import { cartReducer, cartRootSaga } from "./models/ShoppingCart";
import { userReducer, userRootSaga } from "./models/User";

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(logger, sagaMiddleware);

const store = createStore(
  combineReducers({
    authentication: authReducer,
    shoppingCart: cartReducer,
    user: userReducer
  }),
  middleware
);

const rootSagas = [authRootSaga, cartRootSaga, userRootSaga];

rootSagas.forEach(sagaMiddleware.run);

export default store;
