import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import AddToCart from '../views/AddToCart';
import { AddToCartContext } from '../../contexts/AddToCartContext';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { productDetails: {} };
  }

  componentDidMount() {
    const productId = this.props.productId; // this.props.match.params.productId
    this.props.getProductDetails(productId);
  }

  // Passing AddToCartContext as it might be used at any deep level child.
  render() {
    return (
      <AddToCartContext.Provider value={{ action: this.props.addToCartAction }}>
        <div>
          {typeof this.props.productDetails !== 'undefined' && (
            <React.Fragment>
              <h3 className="center">
                Product Details - {this.props.productDetails.title}
              </h3>
              Details page of Product.
              <div className="product-box card mb-3">
                <div className="card-body">
                  <div className="text-center">
                    <img
                      className="card-img-top"
                      alt={this.props.productDetails.title}
                      src={this.props.productDetails.imageUrl}
                    />
                  </div>
                  <p className="card-text description">
                    {this.props.productDetails.description}
                  </p>
                  <p className="card-text">
                    <b>Category:</b> {this.props.productDetails.category}
                  </p>
                  <p className="card-text">
                    <b>Made by:</b> {this.props.productDetails.manufacturer}
                  </p>
                  <p className="card-text">
                    <b>Price:</b> Rs. {this.props.productDetails.price}
                  </p>

                  <AddToCart product={this.props.productDetails} />
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </AddToCartContext.Provider>
    );
  }
}

const mapStateToProps = state => {
  return { productDetails: state.products.productDetails };
};

export default connect(
  mapStateToProps,
  actions
)(ProductDetails);
