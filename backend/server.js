require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Use environment variable

app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from frontend
app.use(express.json()); // Parse JSON request bodies

// Endpoint to create a payment intent
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  console.log("Received request to create payment intent with amount:", amount);

  try {
    // Ensure the amount is an integer
    const amountInCents = Math.round(amount);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents, // Amount in cents
      currency: "usd",
    });

    console.log("Payment Intent Created:", paymentIntent);
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({ error: "Failed to create payment intent", details: error.message });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));