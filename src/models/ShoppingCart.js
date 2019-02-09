import { call, takeLatest, select, put  } from 'redux-saga/effects'
import { createAction, createReducer } from 'redux-act'
import mergeByKey from 'array-merge-by-key'
import { sendQuery } from '../lib/api'
import gql from 'graphql-tag'
import {getCartCookie, setCartCookie } from '../services/ShoppingCart'

export const cartAddProductAction = createAction('CART/PRODUCT/ADD')
export const cartRemoveProductAction = createAction('CART/PRODUCT/REMOVE')
export const updateCartAction = createAction('STORE/CART/UPDATE')
export const updateCartItemAction = createAction('CART/UPDATE')
export const loadCartAction = createAction('CART/LOAD')
export const loadCartFailAction = createAction('CART/LOAD/FAIL')
export const setCartLoadingStateAction = createAction('CART/LOADING/TOGGLE')

const GET_USER_PRODUCT_ITEMS = gql`
  query getUserProductItems($ids: [ID]!) {
    userProducts(ids: $ids) {
      id
      user_id
      name
      price
    }
  }
`

const saveStoreToCookie = function*() {
  const {shoppingCart: {productItems}} = yield select()
  yield call(setCartCookie, productItems.map(({id, amount}) => ({id, amount})))
}

const loadCartSaga = function*() {
  try {
    const cart = yield call(getCartCookie)
    if(!cart || !cart.length) return
    const response = yield call( sendQuery, { 
      query: GET_USER_PRODUCT_ITEMS,
      variables: {ids: cart.map(e => e.id)}
    })
    if(!!response.data.userProducts) {
      const updates = response.data.userProducts
      const updatedItems = updates.map(e => ({ ...e, ...cart.find(i => i.id == e.id) }))
      yield put(updateCartAction( {productItems: updatedItems}))
      yield saveStoreToCookie()
      yield put(setCartLoadingStateAction(true))
    } else {
      yield put(loadCartFailAction())
    }
  } catch(err) {
  }
}

const addProductSaga = function*(action) {
  try {
    const state = yield select()
    yield put(updateCartAction( ({productItems: mergeByKey('id', state.shoppingCart.productItems, [action.payload] ) }) ))
    yield saveStoreToCookie()
  } catch(err) {
  }
}

const removeProductSaga = function*(action) {
  try {
    const {shoppingCart: {productItems}} = yield select()
    yield put(updateCartAction({productItems: productItems.filter(e => e.id != action.payload.id)}))
    yield saveStoreToCookie()
  } catch(err) {

  }
}

const updateCartItemSaga = function*(action) {
  try {
    const {shoppingCart: {productItems}} = yield select()
    const updatedItem = productItems.find(e => e.id == action.payload.id)
    const newProductItems = mergeByKey('id', productItems, [{...updatedItem, ...action.payload}])
    yield put(updateCartAction({productItems: newProductItems}))
    yield saveStoreToCookie()
  } catch(err) {
  }
}

export const cartRootSaga = function*() {
  yield takeLatest(loadCartAction, loadCartSaga)
  yield takeLatest(cartAddProductAction, addProductSaga)
  yield takeLatest(cartRemoveProductAction, removeProductSaga)
  yield takeLatest(updateCartItemAction, updateCartItemSaga)
}


const InitialState = {
  loaded: false,
  productItems: []
}

export const cartReducer = createReducer({
  [updateCartItemAction]: (state, payload) => {
    const updatedItem = state.productItems.find(e => e.id == payload.id)
    const productItems = mergeByKey('id', state.productItems, [payload])
    return {...state, productItems}
  },
  [setCartLoadingStateAction]: (state, payload) => ({...state, loaded: payload}),
  [updateCartAction]: (state, payload) => ({...state, ...payload}),
}, InitialState)

