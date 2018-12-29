import { call, takeLatest, takeEvery, all, put, select } from 'redux-saga/effects'
import { createAction, createReducer } from 'redux-act'
import { postUserUpdates, queryUser } from '../services/User'
import { setLoginDetail } from './Authentication'

export const postUserUpdatesAction = createAction('USER/POST')
export const setUserAction = createAction('STORE/USER/UPDATE')
// export const postUserProductsAction = createAction('USER/POST/PRODUCTS')
export const postUserProductsFailAction = createAction('USER/POST/FAIL')
export const postSuccessAction = createAction('USER/POST/SUCCESS')
export const fetchUserDataAction = createAction('USER/FETCH')
export const userFetchFailAction = createAction('USER/FETCH/FAIL')



const postUserUpdatesSaga = function *(action) {
  try {
    const { data } = yield call(postUserUpdates, action.payload)
    if(data && data.updateUser[0]) {
      yield put(setUserAction(data.updateUser[0]))
      yield put(postSuccessAction())
    }
  } catch(e) {
    yield put(postUserProductsFailAction())
  }
}

const getUserSaga = function *(action) {
  try {
    const response = yield call(queryUser, action.payload)
    if(response.data && response.data.users[0].products)
      yield put(setUserAction({
        products: response.data.users[0].products
      }))
  } catch(e) {
    yield put(userFetchFailAction())
  }
}

export const userRootSaga = function *() {
  yield takeLatest(postUserUpdatesAction, postUserUpdatesSaga)
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
  [setUserAction]: (state, payload) => ({...state, ...payload}),
  [setLoginDetail]: (state, {auth_token, ...payload}) => ({...state, ...payload}),
}, InitialState)
