import { call, takeLatest, takeEvery, all, put, select } from 'redux-saga/effects'
import { createAction, createReducer } from 'redux-act'
import { login, loginJWT, setAuthToken, getAuthToken } from '../services/Authentication'

export const checkLoggedInAction = createAction('CHECK_LOGGED_IN')
export const loginAction = createAction('LOGIN')
export const setLoginFailed = createAction('SET_LOGIN_FAILED')
export const setLoginDetail = createAction('SET_LOGIN_DETAIL')
export const errorAction = createAction('LOGIN/ERROR')

const loginSaga = function *(action) {
  try {
    const response = yield call(login, action.payload)
    if(response.data.login) {
      const user = response.data.login
      yield call(setAuthToken, user.auth_token)
      yield put(setLoginDetail(user))
    } else {
      yield put(setLoginFailed())
    }
  } catch(e) {
    yield put(setLoginFailed())
  }
}

const checkLoggedInSaga = function *() {
  try {
    const auth_token = yield call(getAuthToken)
    if(auth_token) {
      const response = yield call(loginJWT, auth_token)
      const user = response.data.loginJWT
      if(user) {
        yield put(setLoginDetail(user))
      }
    }
  } catch(e) {
    yield put(errorAction(true))
  }
}

export const authRootSaga = function *() {
  yield takeLatest(loginAction, loginSaga)
  yield takeLatest(checkLoggedInAction, checkLoggedInSaga)
}

const InitialState = {
  user: {},
  fail: false
}

export const authReducer = createReducer({
  [setLoginDetail]: (state, payload) => ({...state, user: payload, fail: false}),
  [setLoginFailed]: (state) => ({...state, user: {}, fail: true}),
  [errorAction]: (state, payload) => ({...state, error: payload})
}, InitialState)
