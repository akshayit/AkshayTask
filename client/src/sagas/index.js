import { all } from 'redux-saga/effects';
import { watchFetchProducts, watchFetchProductDetails, watchUpdateCart, watchAddToCart, watchDeleteFromCart } from './products';

export default function* rootSaga() {
  yield all([
    watchFetchProducts(),
    watchFetchProductDetails(),
    watchAddToCart(),
    watchUpdateCart(),
    watchDeleteFromCart()
  ]);
}
