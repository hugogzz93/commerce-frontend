import { call, takeLatest, takeEvery, all, put, select } from 'redux-saga/effects'
import { createAction, createReducer } from 'redux-act'
import { queryProducts } from '../services/Products'

export const queryProductsAction = createAction('PRODUCTS/FETCH')
export const queryProductsFailAction = createAction('PRODUCTS/FETCH/FAIL')
export const updateProductsStoreAction = createAction('STORE/PRODUCTS/UPDATE')

const validResponse = res => !!res.data.products
const queryProductsSaga = function *(action) {
  try {
    const response = yield call( queryProducts, action.payload )
    if(validResponse(response))
      yield put(updateProductsStoreAction(response.data.products))
    else
      yield put(queryProductsFailAction())
  } catch(e) {
    yield put(queryProductsFailAction())
  }
}

export const productsRootSaga = function* () {
  yield takeLatest(queryProductsAction, queryProductsSaga)
}

const InitialState = {
}

export const productsReducer = createReducer({
  [updateProductsStoreAction]: (state, productsArray) => (
    Object.assign({}, state, ...productsArray.map(product => ({[product.id]: {...state[product.id], ...product} })))
  )
}, InitialState)
