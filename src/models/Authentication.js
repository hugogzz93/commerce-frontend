import { call, takeLatest, takeEvery, all, put } from 'redux-saga/effects'
import { createAction, createReducer } from 'redux-act'
import { login } from '../services/Authentication'

export const checkLoggedInAction = createAction('CHECK_LOGGED_IN')
export const loginAction = createAction('LOGIN')
export const setLoginFailed = createAction('SET_LOGIN_FAILED')
export const setLoginDetail = createAction('SET_LOGIN_DETAIL')

const loginSaga = function *(action) {
  try {
    const response = yield call(login, action.payload)
    if(response.data.login) {
      yield put(setLoginDetail(response.data.login))
    } else {
      yield put(setLoginFailed())
    }
  } catch(e) {
    yield put(setLoginFailed())
  }
}

export const authRootSaga = function *() {
  yield takeLatest(loginAction, loginSaga)
}

const InitialState = {
  user: {},
  fail: false
}

export const authReducer = createReducer({
  [setLoginDetail]: (state, payload) => ({...state, user: payload, fail: false}),
  [setLoginFailed]: (state) => ({...state, user: {}, fail: true})
}, InitialState)
