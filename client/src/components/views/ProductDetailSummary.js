import React from 'react';
import { Link } from 'react-router-dom';

import AddToCart from './AddToCart';

export default (props) => {
  return(
    <div className="col-6 col-sm-4 col-md-4 col-lg-3">

      <div className="product-box card bg-light mb-3">
        <div className="card-header">
          <h5 className="card-title">
            <Link to={"/product-detail/" + props.product.id}>{props.product.title}</Link>
          </h5>
        </div>
        <div className="card-body">
          <div className="text-center">
            <Link to={"/product-detail/" + props.product.id}>
              <img className="card-img-top" alt={props.product.title} src={props.product.imageUrl} />
            </Link>
          </div>
          <p className="card-text"><b>Price:</b> Rs. {props.product.price}</p>
          <AddToCart product={props.product} />
        </div>
      </div>

    </div>
  );
}
