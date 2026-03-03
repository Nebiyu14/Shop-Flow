import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Stripe from "stripe";
import cors from "cors";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//testing => home page
app.get("/", (req, res) => {
  res.send("Backend server is running...");
});

//create api endpoint for payment intent
app.post("/create-payment-intent", async (req, res) => {
  try {
    //frontend cart data loading here =>
    const cartItems = req.body;
    if (!cartItems || cartItems.length === 0)
      return res.status(400).json({ error: "Cart is empty!" });

    //fetch the product from fakestoreapi for calculating the price
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    // //calculate the total price in here backend
    let totalPrice = 0;
    for (let item of cartItems) {
      const product = products.find((p) => p.id === item.id);
      if (!product)
        return res.status(400).json({ error: "Invalid product ID" });
      totalPrice = totalPrice + product.price * item.quantity;
    }

    //convert to cents
    const amountInCents = Math.round(totalPrice * 100);

    //create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running at port http://localhost:${PORT}`);
});
