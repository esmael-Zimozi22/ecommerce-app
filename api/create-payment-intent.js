const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { amount } = req.body;

  console.log("Creating payment intent with amount:", amount);

  try {
    const amountInCents = Math.round(amount);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Payment intent error:", error);
    res.status(500).json({ error: 'Failed to create payment intent', details: error.message });
  }
};