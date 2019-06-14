import { call, takeLatest, select, put } from "redux-saga/effects";
import { createAction, createReducer } from "redux-act";
import mergeByKey from "array-merge-by-key";
import { sendQuery } from "../lib/api";
import gql from "graphql-tag";
import {
  getCartCookie,
  setCartCookie,
  placeOrder,
  setupPayment
} from "../services/ShoppingCart";
import { logoutAction } from "./Authentication";
import Errors from "../constants/errors";
import iziToast from "izitoast";

export const cartAddProductAction = createAction("CART/PRODUCT/ADD");
export const cartRemoveProductAction = createAction("CART/PRODUCT/REMOVE");
export const updateCartAction = createAction("STORE/CART/UPDATE");
export const updateCartItemAction = createAction("CART/UPDATE");
export const loadCartAction = createAction("CART/LOAD");
export const loadCartFailAction = createAction("CART/LOAD/FAIL");
export const setCartLoadingStateAction = createAction("CART/LOADING/TOGGLE");
export const checkoutAction = createAction("CART/CHECKOUT");
export const checkoutSuccessAction = createAction("CART/CHECKOUT/SUCCESS");
export const checkoutUnknownFailAction = createAction("CART/CHECKOUT/FAIL");
export const paymentUpdateAction = createAction("PAYMENT/UPDATE");

export const PAYMENT = {
  success: "success"
};

const insufficientStockAction = createAction("CART/ERRORS/INSUFFICIENT_STOCK");

const FETCH_PRODUCTS = gql`
  query fetchProducts($ids: [ID!]!) {
    products(query: { ids: $ids }) {
      id
      userId
      name
      price
      stock
    }
  }
`;
const saveStoreToCookie = function*() {
  const {
    shoppingCart: { products }
  } = yield select();
  yield call(setCartCookie, products.map(({ id, amount }) => ({ id, amount })));
};

const loadCartSaga = function*() {
  try {
    const cart = yield call(getCartCookie);
    if (!cart || !cart.length) return;
    const response = yield call(sendQuery, {
      query: FETCH_PRODUCTS,
      variables: { ids: cart.map(e => e.id) }
    });
    if (!!response.data.products) {
      const updates = response.data.products;
      const updatedItems = updates.map(e => ({
        ...e,
        ...cart.find(i => i.id == e.id)
      }));
      yield put(updateCartAction({ products: updatedItems }));
      yield saveStoreToCookie();
      yield put(setCartLoadingStateAction(true));
    } else {
      yield put(loadCartFailAction());
    }
  } catch (err) {}
};

const addProductSaga = function*(action) {
  try {
    const state = yield select();
    yield put(
      updateCartAction({
        products: mergeByKey("id", state.shoppingCart.products, [
          action.payload
        ])
      })
    );
    yield saveStoreToCookie();
  } catch (err) {}
};

const removeProductSaga = function*(action) {
  try {
    const {
      shoppingCart: { products }
    } = yield select();
    yield put(
      updateCartAction({
        products: products.filter(e => e.id != action.payload.id)
      })
    );
    yield saveStoreToCookie();
  } catch (err) {}
};

const updateCartItemSaga = function*(action) {
  try {
    const {
      shoppingCart: { products }
    } = yield select();
    const updatedItem = products.find(e => e.id == action.payload.id);
    const newProducts = mergeByKey("id", products, [
      { ...updatedItem, ...action.payload }
    ]);
    yield put(updateCartAction({ products: newProducts }));
    yield saveStoreToCookie();
  } catch (err) {}
};

const checkoutSaga = function*(action) {
  try {
    const {
      user,
      shoppingCart: { products }
    } = yield select();
    let orderInput = products.reduce(
      (obj, item) => ({
        ...obj,
        [item.userId]: {
          vendorId: item.userId,
          clientId: user.id,
          orderItemsAttributes: [
            ...(obj[item.userId] ? obj[item.userId].orderItemsAttributes : []),
            { productId: item.id, amount: parseInt(item.amount) }
          ]
        }
      }),
      {}
    );
    const orderGroupInput = {
      orders: [
        ...Object.keys(orderInput).map(k => ({
          ...orderInput[k],
          addressId: action.payload.address.id
        }))
      ]
    };
    const response = yield call(placeOrder, { orderGroupInput });
    if (!response.data.order.createGroup.id)
      yield put(checkoutUnknownFailAction());
    yield put(checkoutSuccessAction());
    // const paymentResponse = yield call(setupPayment, {
    //   input: { orderGroupId: response.data.order.createGroup.id }
    // });
    // if (!!paymentResponse.data.payment.setup) {
    //   const url = paymentResponse.data.payment.setup;
    //   window.location = url;
    // }
  } catch (err) {
    yield put(checkoutUnknownFailAction(err));
  }
};

const logoutSaga = function*(action) {
  try {
    yield call(setCartCookie, null);
  } catch (err) {}
};

const paymentSaga = function*(action) {
  try {
    if (action.status == PAYMENT.success) yield put(checkoutSuccessAction());
    else yield put(checkoutUnknownFailAction());

    yield saveStoreToCookie();
  } catch (err) {}
};

const checkoutSuccessSaga = function*(action) {
  iziToast.success({ title: "Order Accepted" });
  yield saveStoreToCookie();
};

export const cartRootSaga = function*() {
  yield takeLatest(loadCartAction, loadCartSaga);
  yield takeLatest(cartAddProductAction, addProductSaga);
  yield takeLatest(cartRemoveProductAction, removeProductSaga);
  yield takeLatest(updateCartItemAction, updateCartItemSaga);
  yield takeLatest(checkoutAction, checkoutSaga);
  yield takeLatest(checkoutSuccessAction, checkoutSuccessSaga);
  yield takeLatest(logoutAction, logoutSaga);
  yield takeLatest(paymentUpdateAction, paymentSaga);
};

const InitialState = {
  loaded: false,
  products: []
};

export const cartReducer = createReducer(
  {
    [updateCartItemAction]: (state, payload) => {
      const products = mergeByKey("id", state.products, [payload]);
      return { ...state, products };
    },
    [setCartLoadingStateAction]: (state, payload) => ({
      ...state,
      loaded: payload
    }),
    [updateCartAction]: (state, payload) => ({ ...state, ...payload }),
    [checkoutSuccessAction]: state => ({ ...state, products: [] }),
    [checkoutAction]: state => ({ ...state, unknown_error: false }),
    [checkoutUnknownFailAction]: state => ({ ...state, unknown_error: true }),
    [insufficientStockAction]: (state, data) => ({
      ...state,
      error: { type: Errors.INSUFFICIENT_STOCK, data }
    })
  },
  InitialState
);
