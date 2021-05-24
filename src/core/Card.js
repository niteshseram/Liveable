import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { addItemToCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({ product, addToCart = true, removeFromCart = false }) => {
  const [redirect, setRedirect] = useState(false);

  const productTitle = product ? product.name : "A default title";
  const productDescription = product
    ? product.description
    : "A default description";
  const productPrice = product ? product.price : 1000;

  const addProductToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={addProductToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {}}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info text-center">
      <div className="card-header lead">{productTitle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {productDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">
          Rs. {productPrice}
        </p>
        <div className="row">
          <div className="col-12">{showAddToCart(addToCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
