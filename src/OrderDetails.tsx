// src/OrderDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import { fetchOrder } from "./firestore";
import { ClipLoader } from "react-spinners";

interface Order {
  id: string; // Firestore document ID
  orderId: string; // Stripe Payment Intent ID
  items: { id: string; name: string; quantity: number; price: number; imageUrl?: string }[];
  totalAmount: number;
  paymentStatus: string; // Match CheckoutPage.tsx
  createdAt: { seconds: number; nanoseconds: number };
  userId?: string;
  shippingInfo?: {
    name: string;
    address: string;
    city: string;
    zip: string;
  };
}

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Added for Back button

  useEffect(() => {
    const loadOrder = async () => {
      try {
        if (!orderId) {
          throw new Error("Order ID is missing.");
        }

        console.log("Loading order details for Firestore ID:", orderId);
        const orderData = await fetchOrder(orderId);

        if (orderData) {
          setOrder(orderData);
        } else {
          setError("No order data found.");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        setError("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ClipLoader color="#4f46e5" size={60} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600 text-xl font-semibold animate-fadeIn">{error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg animate-fadeIn">No order found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-600 text-white shadow-lg fixed w-full top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight animate-fadeIn">Order Details</h1>
          <button
            onClick={() => navigate("/order-history")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-sm"
          >
            Back to Orders
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 animate-fadeIn">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Order #{order.orderId}</h2>
            <span
              className={`px-4 py-1 rounded-full text-sm font-medium shadow-sm ${
                order.paymentStatus === "succeeded"
                  ? "bg-green-100 text-green-800"
                  : order.paymentStatus === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              Status: {order.paymentStatus ? order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1) : "Unknown"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-gray-600 mb-2">
                Total Amount: <span className="font-bold text-indigo-600">${order.totalAmount.toFixed(2)}</span>
              </p>
              <p className="text-gray-600">
                Date: <span className="font-medium text-gray-800">{new Date(order.createdAt.seconds * 1000).toLocaleString()}</span>
              </p>
            </div>
            {order.shippingInfo && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Shipping Information</h3>
                <p className="text-gray-600">Name: <span className="font-medium">{order.shippingInfo.name}</span></p>
                <p className="text-gray-600">Address: <span className="font-medium">{order.shippingInfo.address}</span></p>
                <p className="text-gray-600">City: <span className="font-medium">{order.shippingInfo.city}</span></p>
                <p className="text-gray-600">ZIP: <span className="font-medium">{order.shippingInfo.zip}</span></p>
              </div>
            )}
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mb-3">Items</h3>
          <div className="border-t border-gray-200 pt-4">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center py-3 border-b border-gray-100 last:border-b-0 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md shadow-sm mr-4"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-sm mr-4">
                    No Image
                  </div>
                )}
                <div className="flex-1">
                  <span className="text-gray-800 font-medium">{item.name}</span>
                  <p className="text-gray-600 text-sm">
                    {item.quantity} x ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => navigate("/products")}
              className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </main>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-in-out; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-in-out; }
      `}</style>
    </div>
  );
};

export default OrderDetails;