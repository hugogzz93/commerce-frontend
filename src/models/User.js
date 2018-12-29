import { call, takeLatest, takeEvery, all, put, select } from 'redux-saga/effects'
import { createAction, createReducer } from 'redux-act'
import { updateUser, queryUser } from '../services/User'
import { setLoginDetail } from './Authentication'

export const updateUserAction = createAction('USER/UPDATE')
export const updateUserFailAction = createAction('USER/UPDATE/FAIL')
export const updateSuccessAction = createAction('USER/UPDATE/SUCCESS')
export const fetchUserDataAction = createAction('USER/FETCH')
export const userFetchFailAction = createAction('USER/FETCH/FAIL')
export const updateUserProducts = createAction('USER/UPDATE/PRODUCTS')



const updateUserSaga = function *(action) {
  try {
    const response = yield call(updateUser, action.payload)
    if(response.data && response.data.updateUser)
      debugger
      yield put(updateSuccessAction())
  } catch(e) {
    yield put(updateUserFailAction())
  }
}

const getUserSaga = function *(action) {
  try {
    const response = yield call(queryUser, action.payload)
    if(response.data && response.data.users[0].products)
      yield put(updateUserProducts(response.data.users[0].products))
  } catch(e) {
    yield put(userFetchFailAction())
  }
}

export const userRootSaga = function *() {
  yield takeLatest(updateUserAction, updateUserSaga)
  yield takeLatest(fetchUserDataAction, getUserSaga)
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
  products: []
}

export const userReducer = createReducer({
  [updateUserAction]: (state, payload) => ( {...state, ...payload }),
  [setLoginDetail]: (state, {auth_token, ...payload}) => ({...state, ...payload}),
  [updateUserProducts]: (state, products) => ({...state, user: { ...state.user, products: products }})

}, InitialState)
