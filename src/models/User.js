import { call, takeLatest, takeEvery, all, put, select } from 'redux-saga/effects'
import { createAction, createReducer } from 'redux-act'
import { updateUser } from '../services/User'
import { setLoginDetail } from './Authentication'

export const updateUserAction = createAction('UPDATE')
export const updateUserFailAction = createAction('UPDATE/FAIL')



const updateUserSaga = function *(action) {
  try {
    const response = yield call(updateUser(action.payload))
    debugger
  } catch(e) {
    yield put(updateUserFailAction())
  }

}

export const userRootSaga = function *() {
  yield takeLatest(updateUserAction, updateUserSaga)
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
  description:''
}

export const userReducer = createReducer({
  [updateUser]: (state, payload) => ( {...state, ...payload }),
  [setLoginDetail]: (state, {auth_token, ...payload}) => ({...state, ...payload})
}, InitialState)
