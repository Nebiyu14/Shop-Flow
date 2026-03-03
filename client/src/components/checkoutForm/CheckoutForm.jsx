import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import "./checkoutForm.css";
import { useState } from "react";

function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Get Stripe object (to talk to Stripe servers)
  const stripe = useStripe();

  // Get Elements object (to read card details user typed in PaymentElement)
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // is stripe ready or not
    if (!stripe || !elements) return;
    setIsLoading(true);
    setErrorMsg(""); //clear old error msg

    // Ask stripe to confirm the payment
    const response = await stripe.confirmPayment({
      elements: elements, // collects card info from the form
      confirmParams: {
        return_url: `${import.meta.env.VITE_FRONTEND_BASE_URL}/success`, //redirect to this url if success
      },
    });
    console.log(response.paymentIntent);
    //If Stripe returns an error
    if (response.error) {
      setErrorMsg(response.error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="checkout__form">
      <h3>Payment Details</h3>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        {errorMsg && <div className="checkout__errorMsg">{errorMsg}</div>}
        <button type="submit" className="checkout__button" disabled={isLoading}>
          {isLoading ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
