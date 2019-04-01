import {
  call,
  takeLatest,
  takeEvery,
  all,
  put,
  select
} from "redux-saga/effects";
import { createAction, createReducer } from "redux-act";
import { queryProducts, createProduct } from "../services/Products";

export const queryProductsAction = createAction("PRODUCTS/FETCH");
export const queryProductsFailAction = createAction("PRODUCTS/FETCH/FAIL");
export const updateProductsStoreAction = createAction("STORE/PRODUCTS/UPDATE");
export const createProductAction = createAction("PRODUCTS/POST/CREATE");
const addProductToStoreAction = createAction("PRODUCT/STORE/ADD");
const createProductFailAction = createAction("PRODUCTS/CREATE/FAIL");

const validResponse = res => !!res.data.products;
const queryProductsSaga = function*(action) {
  try {
    const response = yield call(queryProducts, action.payload);
    if (validResponse(response))
      yield put(updateProductsStoreAction(response.data.products));
    else yield put(queryProductsFailAction());
  } catch (e) {
    yield put(queryProductsFailAction(e));
  }
};

const createProductSaga = function*(action) {
  try {
    const res = yield call(createProduct, action.payload);
    const state = yield select();
    yield put(addProductToStoreAction(res.data.product.create));
  } catch (err) {
    console.error(err);
    yield put(createProductFailAction());
  }
};

export const productsRootSaga = function*() {
  yield takeLatest(queryProductsAction, queryProductsSaga);
  yield takeLatest(createProductAction, createProductSaga);
};

const InitialState = {};

export const productsReducer = createReducer(
  {
    [updateProductsStoreAction]: (state, productsArray) =>
      Object.assign(
        {},
        state,
        ...productsArray.map(product => ({
          [product.id]: { ...state[product.id], ...product }
        }))
      ),
    [queryProductsFailAction]: (state, error) => ({ ...state, error }),
    [addProductToStoreAction]: (state, product) => ({
      ...state,
      [product.id]: product
    })
  },
  InitialState
);
