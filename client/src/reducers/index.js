import { combineReducers } from 'redux';

// Reducers

import cartReducer from './cartReducer';
import productsReducer from './productsReducer';
import { reducer as form } from 'redux-form';

// Combine Reducers
export default combineReducers({
  cart: cartReducer,
  products: productsReducer,
  form
});
