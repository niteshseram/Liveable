import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cartEmpty, loadCart } from "../helper/cartHelper";
import { isAuthenticated } from "./../../auth/helper/index";
import StripeCheckoutButton from "react-stripe-checkout";

const StripeCheckout = ({ products, setReload, reload }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getTotalPrice = () => {
    return products.reduce((total, product) => {
      return total + product.price;
    }, 0);
  };

  const makePayment = () => {
    //
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey=""
        token={makePayment}
        amount={getTotalPrice() * 100}
        name="Buy Tshirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with Stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">StripCheckout {getTotalPrice()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
