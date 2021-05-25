import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./payment/StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProduct = (products) => {
    return (
      <div>
        <h2>This section is load products</h2>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              addToCart={false}
              removeFromCart={true}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <StripeCheckout
        products={products}
        setReload={setReload}
        reload={reload}
      />
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      {products && products.length > 0 ? (
        <div className="row">
          <div className="col-6">{loadAllProduct(products)}</div>
          <div className="col-6">{loadCheckout()}</div>
        </div>
      ) : (
        <div className="row">
          <h3 className="text-white">Cart is empty!</h3>
        </div>
      )}
    </Base>
  );
};

export default Cart;
