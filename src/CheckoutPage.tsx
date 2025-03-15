// src/CheckoutPage.tsx
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { auth, db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import { clearCart } from "./cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const stripePromise = loadStripe("pk_test_51QzjSrD6LMSaWTa77zGTxzEU360zRAX0xu7M58OY6frg9oZKmoxofQ0RgzEnoDjTre6vKZ5VQyZPcYvMMRWwhWpi00sd4NBIV8");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
  });

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const saveOrderToFirestore = async (paymentIntent: any) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const order = {
          userId: user.uid,
          orderId: paymentIntent.id, // Stripe Payment Intent ID
          items: cartItems,
          totalAmount: totalPrice,
          shippingInfo,
          paymentStatus: paymentIntent.status,
          createdAt: new Date(),
        };
        const docRef = await addDoc(collection(db, "orders"), order);
        console.log("Order saved with Firestore ID:", docRef.id);
        return { ...order, id: docRef.id }; // Return Firestore ID as 'id'
      } catch (error) {
        console.error("Error saving order to Firestore:", error);
        throw new Error("Failed to save order.");
      }
    } else {
      throw new Error("User not authenticated.");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.city || !shippingInfo.zip) {
      setError("Please fill out all shipping fields.");
      toast.error("Please fill out all shipping fields.");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      toast.error("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const amountInCents = Math.round(totalPrice * 100);
      const response = await fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountInCents }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const { clientSecret } = await response.json();
      console.log("Client Secret:", clientSecret);

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (stripeError) {
        setError(stripeError.message || "Payment failed.");
        toast.error(stripeError.message || "Payment failed.");
      } else if (paymentIntent.status === "succeeded") {
        const order = await saveOrderToFirestore(paymentIntent);
        dispatch(clearCart());

        toast.success(
          <div>
            <p>Payment successful! Your order has been placed.</p>
            <button
              onClick={() => navigate("/order-confirmation", { state: { order } })}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-all duration-200"
            >
              View Order
            </button>
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );

        setTimeout(() => {
          navigate("/order-confirmation", { state: { order } });
        }, 3000);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError("Payment failed. Please try again.");
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-gray-800 font-semibold">{item.name}</p>
                  <p className="text-gray-600">
                    ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            <div className="border-t pt-4 mt-4">
              <p className="text-xl font-bold text-gray-800">Total: ${totalPrice.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipping & Payment</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={shippingInfo.name}
                onChange={handleShippingChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md transition-all duration-200"
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-gray-700 font-medium mb-1">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={shippingInfo.address}
                onChange={handleShippingChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md transition-all duration-200"
                required
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-gray-700 font-medium mb-1">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={shippingInfo.city}
                onChange={handleShippingChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md transition-all duration-200"
                required
              />
            </div>
            <div>
              <label htmlFor="zip" className="block text-gray-700 font-medium mb-1">Zip Code</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={shippingInfo.zip}
                onChange={handleShippingChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md transition-all duration-200"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Card Information</label>
            <div className="border p-3 rounded-md shadow-sm hover:shadow-md transition-all duration-200">
              <CardElement
                options={{
                  style: {
                    base: { fontSize: "16px", color: "#424770", "::placeholder": { color: "#aab7c4" } },
                    invalid: { color: "#9e2146" },
                  },
                }}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={!stripe || loading || cartItems.length === 0}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-md hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              {loading ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`}
            </button>
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Back to Cart
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <section className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-6">Checkout</h1>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </section>
      <ToastContainer />
    </div>
  );
};

export default CheckoutPage;