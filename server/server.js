import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Stripe from "stripe";
import cors from "cors";


const app = express();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY in server");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Backend server is running...");
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const cartItems = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty!" });
    }

    const productResponse = await fetch("https://fakestoreapi.com/products");

    if (!productResponse.ok) {
      return res.status(502).json({ error: "Failed to load products" });
    }

    const products = await productResponse.json();

    let totalPrice = 0;

    for (const item of cartItems) {
      const itemId = Number(item?.id);
      const quantity = Number(item?.quantity);

      if (!Number.isInteger(itemId) || !Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({ error: "Invalid cart data" });
      }

      const product = products.find((p) => Number(p.id) === itemId);

      if (!product) {
        return res.status(400).json({ error: `Invalid product ID: ${itemId}` });
      }

      const productPrice = Number(product.price);
      if (!Number.isFinite(productPrice) || productPrice < 0) {
        return res.status(400).json({ error: `Invalid product price for ID: ${itemId}` });
      }

      totalPrice += productPrice * quantity;
    }

    const amountInCents = Math.round(totalPrice * 100);

    if (!Number.isInteger(amountInCents) || amountInCents <= 0) {
      return res.status(400).json({ error: "Invalid total amount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("create-payment-intent error:", error);
    return res.status(500).json({
      error: "Something went wrong while creating payment intent",
      details: error?.message || "Unknown server error",
    });
  }
});

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
