import { call, takeLatest, takeEvery, all, put, select } from 'redux-saga/effects'
import { createAction, createReducer } from 'redux-act'
import { mutateUser, queryUser } from '../services/User'
import { setLoginDetail } from './Authentication'

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
    debugger
    if(validResponse(response)) {
      yield put(updateUserStoreAction(response.data.user.updateUser))
      yield put(mutateUserSuccessAction())
    }
  } catch(e) {
    yield put(mutateUserFailAction())
  }
}

const queryUserSaga = function *(action) {
  try {
    const response = yield call(queryUser, action.payload)
    if(response.data && response.data.users[0])
      yield put(updateUserStoreAction(response.data.users[0]))
  } catch(e) {
    yield put(queryUserFailAction())
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
  products: []
}

export const userReducer = createReducer({
  [updateUserStoreAction]: (state, payload) => ({...state, ...payload}),
  [setLoginDetail]: (state, {auth_token, ...payload}) => ({...state, ...payload}),
}, InitialState)
