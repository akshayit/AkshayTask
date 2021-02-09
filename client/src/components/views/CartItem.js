import React from 'react';
import CartUpdateForm from './CartUpdateForm';

export default (props) => {
  return(
    <tr className={"row-" + props.product.id}
      onClick={e => props.handleClickRow(props.product.id)}>

      <th scope="row">{ props.counter }</th>
      <td>{ props.product.title }</td>
      <td>${ props.product.price }</td>
      <td>
        <CartUpdateForm product={props.product}
          cartFormElement={props.cartFormElement}
          handleRemoveCartItem={props.handleRemoveCartItem}
          handleChangeCartQuantity={props.handleChangeCartQuantity} />
      </td>
    </tr>
  );
}
