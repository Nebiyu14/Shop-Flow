import React from "react";
import "./checkout.css";
import { useCart } from "../../context/CartContext";
import OrderSummary from "../../components/orderSummary/OrderSummary";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);

function Checkout() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchClientSecret = async () => {
      console.log("checkout.jsx: checkout page mounted");
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/create-payment-intent`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
              cart.map((item) => {
                return { id: item.id, quantity: item.quantity };
              }),
            ),
          },
        );
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent: ", error);
      }
    };
    fetchClientSecret();
  }, []);

  if (cart.length === 0) {
    navigate("/");
  }

  return (
    <div className="checkout__container">
      <h2 className="checkout__header__title">Checkout</h2>

      <div className="checkout__body">
        <div className="checkout__left_payment">
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
        <div className="checkout__right_summary">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
