import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cartEmpty, loadCart } from "../helper/cartHelper";
import { isAuthenticated } from "./../../auth/helper/index";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "./../../backend";

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

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        cartEmpty(() => {
          setReload(!reload);
        });
      })
      .catch((err) => console.log(err));
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51HM7hZJzYDLWpGxk80rG4VDpWW09yqOzmrvPdiri5Dxi8GUo8hIznDDAWJ7RvskuZ4BIQMRFB8lug2MAGgmh7s8u00IZKYpx0e"
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
