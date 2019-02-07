import { call, takeLatest, takeEvery, all, put, select } from 'redux-saga/effects'
import { createAction, createReducer } from 'redux-act'
import { queryUserProducts } from '../services/UserProduct'
import { cartAddProductAction } from './ShoppingCart'

export const queryUserProductAction = createAction('USER_PRODUCT/FETCH')
export const queryUserProductFailAction = createAction('USER_PRODUCT/FETCH/FAIL')
export const updateUserProductStoreAction = createAction('STORE/USER_PRODUCT/UPDATE')
export const cartUpdateFailAction = createAction('USER_PRODUCT/RELATIONS/CART/FAIL')

//get attributes from the query and reduce it to only what you dont have

const validResponse = res => !!res.data.userProducts
const queryUserProductSaga = function *(action) {
  try {
    // debugger
    const response = yield call( queryUserProducts, action.payload )
    if(validResponse(response))
      yield put(updateUserProductStoreAction(response.data.userProducts))
  } catch(err) {
    yield put(queryUserProductFailAction(err))
  }
}

// const cartUpdateHandler = function *(action) {
//   try {
//     const state = yield select()
//     if(state[action.id]) return
//
//
//   } catch(err) {
//     yield put(cartUpdateHandleFailAction(err))
//   }
// }

export const userProductRootSaga = function *() {
  yield takeLatest(queryUserProductAction, queryUserProductSaga)
  // yield takeLatest(cartAddProductAction, cartUpdateHandler)
}

const InitialState = {

}

export const userProductReducer = createReducer({
  [updateUserProductStoreAction]: (state, payload) => ({...state, ...payload.map(uProduct => ({[uProduct.id]: uProduct}))})
}, InitialState)
