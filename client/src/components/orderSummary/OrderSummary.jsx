import React from "react";
import "./orderSummary.css";
import { useCart } from "../../context/CartContext";

function OrderSummary() {
  const { cart, getItemCount, get_total_price } = useCart();
  const total = get_total_price(cart); //total price
  const totalItems = getItemCount; //total items in the cart

  return (
    <div className="order__summary">
      <h3 className="order__summary__title">Order Summary</h3>

      <div className="summary__items__list">
        {cart.map((item) => (
          <div key={item.id} className="summary__item">
            <div className="summary__item__image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="summary__item__details">
              <p className="summary__item__title">{item.title}</p>
              <p className="summary__item__qty">
                {item.quantity} x ${item.price}
              </p>
            </div>
            <p className="summary__item__subtotal">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="summary__divider" />

      <div className="summary__row">
        <span>Items</span>
        <span>{totalItems}</span>
      </div>
      <div className="summary__row">
        <span>Shipping</span>
        <span className="summary__free">Free</span>
      </div>

      <div className="summary__divider" />

      <div className="summary__row summary__total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default OrderSummary;
