import { call, takeLatest, select, put  } from 'redux-saga/effects'
import { createAction, createReducer } from 'redux-act'
import mergeByKey from 'array-merge-by-key'
import { sendQuery } from '../lib/api'
import gql from 'graphql-tag'
import {getCartCookie, setCartCookie, placeOrder } from '../services/ShoppingCart'
import { logoutAction } from './Authentication'
import Errors from '../constants/errors'

export const cartAddProductAction = createAction('CART/PRODUCT/ADD')
export const cartRemoveProductAction = createAction('CART/PRODUCT/REMOVE')
export const updateCartAction = createAction('STORE/CART/UPDATE')
export const updateCartItemAction = createAction('CART/UPDATE')
export const loadCartAction = createAction('CART/LOAD')
export const loadCartFailAction = createAction('CART/LOAD/FAIL')
export const setCartLoadingStateAction = createAction('CART/LOADING/TOGGLE')
export const checkoutAction = createAction('CART/CHECKOUT')
export const checkoutSuccessAction = createAction('CART/CHECKOUT/SUCCESS')
export const checkoutUnknownFailAction = createAction('CART/CHECKOUT/FAIL')
const insufficientStockAction = createAction('CART/ERRORS/INSUFFICIENT_STOCK')


const FETCH_PRODUCTS = gql`
  query fetchProducts($ids: [ID!]!) {
    products(query: {ids: $ids}) {
      id
      userId
      name
      price
    }
  }
`
const saveStoreToCookie = function*() {
  const {shoppingCart: {products}} = yield select()
  yield call(setCartCookie, products.map(({id, amount}) => ({id, amount})))
}

const loadCartSaga = function*() {
  try {
    const cart = yield call(getCartCookie)
    if(!cart || !cart.length) return
    const response = yield call( sendQuery, { 
      query: FETCH_PRODUCTS,
      variables: {ids: cart.map(e => e.id)}
    })
    if(!!response.data.products) {
      const updates = response.data.products
      const updatedItems = updates.map(e => ({ ...e, ...cart.find(i => i.id == e.id) }))
      yield put(updateCartAction( {products: updatedItems}))
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
    yield put(updateCartAction( ({products: mergeByKey('id', state.shoppingCart.products, [action.payload] ) }) ))
    yield saveStoreToCookie()
  } catch(err) {
  }
}

const removeProductSaga = function*(action) {
  try {
    const {shoppingCart: {products}} = yield select()
    yield put(updateCartAction({products: products.filter(e => e.id != action.payload.id)}))
    yield saveStoreToCookie()
  } catch(err) {

  }
}

const updateCartItemSaga = function*(action) {
  try {
    const {shoppingCart: {products}} = yield select()
    const updatedItem = products.find(e => e.id == action.payload.id)
    const newProducts = mergeByKey('id', products, [{...updatedItem, ...action.payload}])
    yield put(updateCartAction({products: newProducts}))
    yield saveStoreToCookie()
  } catch(err) {
  }
}

const checkoutSaga = function *(action) {
  try {
    const { user, shoppingCart: { products }} = yield select()
    const orderInput = products.reduce((obj, item) => ({
      ...obj,
      [item.user_id]: {
        vendor_id: item.user_id,
        client_id: user.id,
        orderItems: [
          ...obj[item.user_id] ? obj[item.user_id].orderItems : [],
          { user_product_item_id: item.id, amount: parseInt(item.amount) }
        ]
      }
    }), {})

    const orderGroupInput = {
      client_id: user.id,
      orders: [...Object.keys(orderInput).map(k => orderInput[k])]
    }
    const response = yield call(placeOrder, { orderGroupInput } )
    if(!!response.data.order.createOrderGroup) {
      yield put(checkoutSuccessAction())
      yield saveStoreToCookie()
    }
    else {
      yield put(checkoutUnknownFailAction())
    }
  } catch(err) {
    try {
      const error = err.graphQLErrors[0].extensions.exception
      if('InsufficientStock' == error.type)
        yield put(insufficientStockAction(error.data))
      else
      yield put(checkoutUnknownFailAction(err))
    } catch {
      yield put(checkoutUnknownFailAction(err))
    }
  }
}

const logoutSaga = function *(action) {
  try {
    yield call(setCartCookie, null)
  } catch(err) {}
}

export const cartRootSaga = function*() {
  yield takeLatest(loadCartAction, loadCartSaga)
  yield takeLatest(cartAddProductAction, addProductSaga)
  yield takeLatest(cartRemoveProductAction, removeProductSaga)
  yield takeLatest(updateCartItemAction, updateCartItemSaga)
  yield takeLatest(checkoutAction, checkoutSaga)
  yield takeLatest(logoutAction, logoutSaga)
}


const InitialState = {
  loaded: false,
  products: []
}

export const cartReducer = createReducer({
  [updateCartItemAction]: (state, payload) => {
    const products = mergeByKey('id', state.products, [payload])
    return {...state, products}
  },
  [setCartLoadingStateAction]: (state, payload) => ({...state, loaded: payload}),
  [updateCartAction]: (state, payload) => ({...state, ...payload}),
  [checkoutSuccessAction]: (state) => ({...state, products: []}),
  [checkoutAction]: (state) => ({...state, unknown_error: false}),
  [checkoutUnknownFailAction]: (state) => ({...state, unknown_error: true}),
  [insufficientStockAction]: (state, data) => ({...state, error: {type: Errors.INSUFFICIENT_STOCK, data} })
}, InitialState)

