import { call, takeLatest, takeEvery, all, put, select } from 'redux-saga/effects'
import { createAction, createReducer } from 'redux-act'
import { login, logout, loginJWT, setAuthTokenCookie, getAuthToken } from '../services/Authentication'

export const checkLoggedInAction = createAction('CHECK_LOGGED_IN')
export const loginAction = createAction('LOGIN')
export const logoutAction = createAction('LOGOUT')
export const setLoginFailed = createAction('SET_LOGIN_FAILED')
export const setLoginDetail = createAction('SET_LOGIN_DETAIL')
export const errorAction = createAction('LOGIN/ERROR')

const loginSaga = function *(action) {
  try {
    const response = yield call(login, action.payload)
    if(response.data.login) {
      const user = response.data.login
      yield call(setAuthTokenCookie, user.auth_token)
      yield put(setLoginDetail(user))
    } else {
      yield put(setLoginFailed())
    }
  } catch(e) {
    yield put(setLoginFailed())
  }
}

const logoutSaga = function *(action) {
  try {
    const auth_token = yield select().authentication.auth_token
    if(auth_token) yield call(logout, action.payload)
    yield call(setAuthTokenCookie, null)
    yield put(setLoginDetail({auth_token: null}))
  } catch(e) {
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
  yield takeLatest(logoutAction, loginSaga)
  yield takeLatest(checkLoggedInAction, checkLoggedInSaga)
}

const InitialState = {
  auth_token: '',
  fail: false
}

export const authReducer = createReducer({
  [setLoginDetail]: (state, {auth_token}) => ({...state, auth_token, fail: false}),
  [setLoginFailed]: (state) => ({...state, auth_token: null, fail: true}),
  [errorAction]: (state, payload) => ({...state, error: payload})
}, InitialState)
