import { call, takeLatest, takeEvery, all, put, select } from 'redux-saga/effects'
import { createAction, createReducer } from 'redux-act'
import { mutateUser, queryUser } from '../services/User'
import { setLoginDetail } from './Authentication'
import mergeByKey from 'array-merge-by-key'

export const mutateUserAction = createAction('USER/POST')
export const updateUserStoreAction = createAction('STORE/USER/UPDATE')
export const mutateUserFailAction = createAction('USER/POST/FAIL')
export const mutateUserSuccessAction = createAction('USER/POST/SUCCESS')
export const queryUserAction = createAction('USER/FETCH')
export const queryUserFailAction = createAction('USER/FETCH/FAIL')

const validResponse = res => !!res.data.user
const mutateUserSaga = function *(action) {
  try {
    const response = yield call(mutateUser, action.payload)
    if(validResponse(response)) {
      const userOps = response.data.user
      const state = yield select()
      const updates = {
        ...(userOps.updateUser || {}),
        ...(userOps.addProducts ? {products: state.user.products.concat(userOps.addProducts)} : {}),
        ...(userOps.removeProducts ? {products: state.user.products.filter(id => !userOps.removeProducts.includes(id))} : {}),
        ...(userOps.createUserProduct ? {userProducts: state.user.userProducts.concat([ userOps.createUserProduct ])} : {}),
        ...(userOps.updateUserProduct ? {userProducts: mergeByKey('id', state.user.userProducts, [userOps.updateUserProduct])} : {}),
      }
      yield put(updateUserStoreAction(updates))
      yield put(mutateUserSuccessAction())
    }
  } catch(error) {
    yield put(mutateUserFailAction())
  }
}

const queryUserSaga = function *(action) {
  try {
    const response = yield call(queryUser, action.payload)
    if(response.data && response.data.users[0])
      yield put(updateUserStoreAction(response.data.users[0]))
  } catch(e) {
    yield put(queryUserFailAction(e))
  }
}

export const userRootSaga = function *() {
  yield takeLatest(mutateUserAction, mutateUserSaga)
  yield takeLatest(queryUserAction, queryUserSaga)
}

const InitialState = {
  name: '',
  email: '',
  password:'',
  phone: '',
  country:'',
  city:'',
  street:'',
  street_2:'',
  street_number:'',
  zipcode:'',
  description:'',
  products: [],
  userProducts: []
}

const preProcessUserProducts = (products) => {
  //if products is an array of objects make them an array of ints
  return products[0] && products[0].id ? products.map(p => p.id) : products
}

const preProcess = (payload) => ({
  ...payload,
  ...payload.products ? {products: preProcessUserProducts(payload.products) } : {}
})

export const userReducer = createReducer({
  [updateUserStoreAction]: (state, payload) => ({...state, ...preProcess(payload)}),
  [setLoginDetail]: (state, {auth_token, ...payload}) => ({...state, ...preProcess(payload)}),
  [queryUserFailAction]: (state, error) => ({...state, error })
}, InitialState)
