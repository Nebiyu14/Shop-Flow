import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Cart from "../pages/cart/Cart";
import Success from "../pages/success/Success";
import Cancel from "../pages/cancel/Cancel";
import Layout from "../layout/Layout";
import Checkout from "../pages/checkout/Checkout";
import PageNotFound from "../components/pageNotFound/PageNotFound";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);

function PageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/success"
          element={
            <Elements stripe={stripePromise}>
              <Success />
            </Elements>
          }
        />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default PageRoutes;
