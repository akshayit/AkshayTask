import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/action-types';

export function* watchFetchProducts() {
  yield takeLatest(types.FETCH_PRODUCTS_REQUEST, fetchProductsSaga);
}

export function* fetchProductsSaga(action) {
  console.log(action)
  try {
    const products = yield fetch(
      process.env.REACT_APP_REMOTE_HOST + '/api/get-all-products')
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        return json.data;
      });

    yield put({ type: types.FETCH_PRODUCTS_SUCCESS, payload: products });
  } catch (error) {
    console.log(error);
  }
}

export function* watchFetchProductDetails() {
  yield takeLatest(
    types.FETCH_PRODUCT_DETAILS_REQUEST,
    fetchProductDetailsSaga
  );
}

export function* fetchProductDetailsSaga(action) {
  try {
    const product = yield fetch('/data/ProductData.json')
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(res => res.json())
      .then(json => {
        return json.Products.filter(product => {
          if (product.Id === action.productId) {
            return true;
          } else {
            return false;
          }
        });
      });

    yield put({ type: types.FETCH_PRODUCT_DETAILS_SUCCESS, payload: product });
  } catch (error) {
    console.log(error);
  }
}

export function* watchAddToCart() {
  yield takeLatest(types.ADD_TO_CART, addToCartSaga);
}


export function* addToCartSaga(action) {
  try {
    console.log(action)
    const response = yield fetch(
      process.env.REACT_APP_REMOTE_HOST + '/api/add-to-cart',
      {
        method: 'POST',
        body: JSON.stringify(action.payload)
      }
    );
    const data = yield response.json();
    console.log(data)
    if (data.success) {
      yield call(action.resolve, data.data);
    } else {
      yield call(action.reject, data);
    }
    
  } catch (e) {
    console.log(e);
    yield call(action.reject);
  }
}


export function* watchDeleteFromCart() {
  yield takeLatest(types.REMOVE_FROM_CART, deleteFromCartSaga);
}


export function* deleteFromCartSaga(action) {
  console.log(action);
  try {
    const response = yield fetch(
      process.env.REACT_APP_REMOTE_HOST + '/api/delete-from-cart',
      {
        method: 'POST',
        body: JSON.stringify({
          id: action.productId
        })
      }
    );
    const data = yield response.json();
    if (data.success) {
      yield call(action.resolve, data.data);
    } else {
      yield call(action.reject, data);
    }
  } catch (e) {
    console.log(e);
    yield call(action.reject);
  }
}



export function* watchUpdateCart() {
  yield takeLatest(types.UPDATE_CART, updateCartSaga);
}


export function* updateCartSaga(action) {
  console.log(action);
  try {
    const response = yield fetch(
      process.env.REACT_APP_REMOTE_HOST + '/api/update-cart',
      {
        method: 'POST'
      }
    );
    const data = yield response.json();
    if (data.success) {
      yield call(action.resolve, data.data);
    } else {
      yield call(action.reject, data);
    }
  } catch (e) {
    console.log(e);
    yield call(action.reject);
  }
}
