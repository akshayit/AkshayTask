import React, { Component } from "react";
import {formatCurrency, calculateTotal} from "../util";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { removeFromCart } from "../actions/cartActions";
import { createOrder, clearOrder } from "../actions/orderActions";


class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckout: false
    };
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  createOrder = (e) => {
    e.preventDefault();
    console.log(this.props.cartItems)
    const order = {
      cartItems: this.props.cartItems,
      total: calculateTotal(this.props.cartItems)
    };
    this.props.createOrder(order);
  };
  closeModal = () => {
    this.props.clearOrder();
  };
  render() {
    const { cartItems, order } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} in the cart{" "}
          </div>
        )}

        {order && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="order-details">
                <h3 className="success-message">Your order has been placed.</h3>
                <h2>Order {order._id}</h2>

                <div className="success-message">Cart Items:</div>
                <table>
                  <thead>
                    <tr className="needPad">
                      <th>seq no</th>
                      <th>Count</th>
                      <th></th>
                      <th>Price</th>
                      <th>Product</th>
                    </tr>
                  </thead>
                  <tbody>

                  {order.cartItems.map((x, i) => (
                    <tr key={i}>
                    <td>{i+1}</td>
                    <td>{x.count}</td>
                    <td>X</td>
                    <td>{x.price}</td>
                    <td>{x.title}</td>
                  </tr>
                  ))}
                  </tbody>
                </table>
                <div className="success-message">Total: {formatCurrency(order.total)}</div>
              </div>
            </Zoom>
          </Modal>
        )}
        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title}></img>
                    </div>
                    <div>
                      <div>{item.title}</div>
                      <div className="right">
                        {formatCurrency(item.price)} x {item.count}{" "}
                        <button
                          className="button"
                          onClick={() => this.props.removeFromCart(item)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <button
                    onClick={this.createOrder}
                    className="button primary"
                  >
                    Checkout Order
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    order: state.order.order,
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart, createOrder, clearOrder }
)(Cart);
