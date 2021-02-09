import React from 'react';

export default (props) => {
  console.log(props)
  return(
    <div className="input-group cart-form-input-group">
      <input type="number" className="form-control"
        onChange={e => props.handleChangeCartQuantity(e, props.product.id)}
        value={props.cartFormElement.quantity} />

      <button type="button" className="btn btn-outline-danger btn-remove-cart"
        onClick={e => props.handleRemoveCartItem(props.product)}>X</button>
    </div>
  );
}
