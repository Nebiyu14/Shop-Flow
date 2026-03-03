import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import CartItems from "./CartItems";
import "./cart.css";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { get_total_price } from "../../utility/cartFunctions";

function Cart() {
  const { cart, getItemCount } = useCart();

  //total price
  const totalPrice = get_total_price(cart);

  return (
    <div className="cart__page__container">
      <h2 className="cart__header__title">Your Bag</h2>
      <div className="cart__body">
        {/* Left — scrollable item list */}
        <div className="cart__items__list">
          {cart.length === 0 ? (
            <div className="cart__empty">
              <p>Your bag is empty.</p>
              <Link to={"/"} className="cart__start__shopping">
                <span>
                  <KeyboardBackspaceIcon fontSize="small" />
                </span>
                Start Shopping
              </Link>
            </div>
          ) : (
            cart.map((item) => <CartItems key={item.id} singleProduct={item} />)
          )}
        </div>

        {/* Right — sticky summary */}
        <div className="cart__summary">
          <h3 className="cart__summary__title">Order Summary</h3>
          <div className="cart__summary__row">
            <span>Items</span>
            <span>{getItemCount}</span>
          </div>
          <div className="cart__summary__row">
            <span>Subtotal</span>
            <span>$ {totalPrice.toFixed(2)} </span>
          </div>
          <div className="cart__summary__row">
            <span>Shipping</span>
            <span className="cart__summary__free">Free</span>
          </div>
          <div className="cart__summary__divider"></div>
          <div className="cart__summary__row cart__summary__total">
            <span>Total</span>
            <span>$ {totalPrice.toFixed(2)} </span>
          </div>
          <Link to={"/checkout"}>
            <button
              className={
                cart.length === 0
                  ? "cart__checkout__btn__disabled"
                  : "cart__checkout__btn"
              }
              disabled={cart.length === 0}
            >
              Proceed to Checkout
            </button>
          </Link>
          <Link to="/" className="cart__continue">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
