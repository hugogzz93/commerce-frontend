import {
  call,
  takeLatest,
  takeEvery,
  all,
  put,
  select
} from "redux-saga/effects";
import { createAction, createReducer } from "redux-act";
import {
  login,
  logout,
  fetchCurrentUser,
  setAuthTokenCookie,
  getAuthToken
} from "../services/Authentication";
import { updateUserStoreAction } from "./User";

export const checkLoggedInAction = createAction("CHECK_LOGGED_IN");
export const loginAction = createAction("LOGIN");
export const logoutAction = createAction("LOGOUT");
export const setLoginFailed = createAction("SET_LOGIN_FAILED");
export const setLoginDetail = createAction("SET_LOGIN_DETAIL");
export const errorAction = createAction("LOGIN/ERROR");

const loginSaga = function*(action) {
  try {
    const response = yield call(login, action.payload);
    if (response.data.signIn.authToken) {
      yield call(setAuthTokenCookie, response.data.signIn.authToken);
      yield put(checkLoggedInAction());
    } else {
      yield put(setLoginFailed());
    }
  } catch (e) {
    yield put(setLoginFailed());
  }
};

const logoutSaga = function*(action) {
  try {
    const state = yield select();
    const auth_token = state.auth_token;
    if (auth_token) yield call(logout, action.payload);
    yield call(setAuthTokenCookie, null);
    yield put(updateUserStoreAction(null));
  } catch (err) {}
};

const checkLoggedInSaga = function*() {
  try {
    const auth_token = yield call(getAuthToken);
    if (auth_token) {
      const response = yield call(fetchCurrentUser);
      const user = response.data.currentUser;
      if (user) {
        yield put(setLoginDetail({ auth_token }));
        yield put(updateUserStoreAction(user));
      }
    }
  } catch (e) {
    yield put(errorAction(true));
  }
};

export const authRootSaga = function*() {
  yield takeLatest(loginAction, loginSaga);
  yield takeLatest(logoutAction, logoutSaga);
  yield takeLatest(checkLoggedInAction, checkLoggedInSaga);
};

const InitialState = {
  auth_token: "",
  fail: false
};

export const authReducer = createReducer(
  {
    [setLoginDetail]: (state, { auth_token }) => ({
      ...state,
      auth_token,
      fail: false
    }),
    [setLoginFailed]: state => ({ ...state, auth_token: null, fail: true }),
    [loginAction]: state => ({ ...state, fail: false }),
    [errorAction]: (state, payload) => ({ ...state, error: payload })
  },
  InitialState
);
