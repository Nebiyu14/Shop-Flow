import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./success.css";
import { useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useEffect } from "react";
import { useCart } from "../../context/CartContext";

function Success() {
  const { clearCart } = useCart();
  const stripe = useStripe();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = searchParams.get("payment_intent_client_secret");
    if (!clientSecret) {
      setStatus("error");
      return;
    }

    //retrieve payment intent
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setStatus("success");
          clearCart();
          break;

        case "processing":
          setStatus("processing");
          break;

        case "requires_payment_method":
          setStatus("failed");
          break;

        default:
          setStatus("error");
      }
    });
  }, [stripe, searchParams]);
  return (
    <div className="success__container">
      {status === "loading" && <h2>Checking payment status...</h2>}

      {status === "success" && (
        <div className="success__content">
          <div className="success__icon">&#10003;</div>
          <p className="success__tag">Order Confirmed</p>
          <h1 className="success__title">Thank You for Your Purchase!</h1>
          <p className="success__message">
            Your order has been placed successfully.
          </p>
          <Link to="/" className="success__btn__primary">
            Continue Shopping
          </Link>
        </div>
      )}

      {status === "processing" && <h2>Payment is processing...</h2>}

      {status === "failed" && <h2>Payment failed. Please try again.</h2>}

      {status === "error" && <h2>Something went wrong.</h2>}
    </div>
  );
}

export default Success;
