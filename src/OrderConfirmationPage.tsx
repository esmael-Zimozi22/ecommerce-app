// src/OrderConfirmationPage.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface Order {
  id: string; // Firestore document ID
  totalAmount: number;
  paymentStatus: string;
  shippingInfo: {
    name: string;
    address: string;
    city: string;
    zip: string;
  };
  items: CartItem[];
}

const OrderConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order as Order;

  console.log("Order Confirmation State:", state);

  if (!order || !order.id) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Confirmation</h1>
          <p className="text-gray-500">No order details found. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <section className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-6">Order Confirmation</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Thank You for Your Purchase!</h2>
          <p className="text-gray-600 mb-6">Your order has been successfully placed. Here are the details:</p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Order Details</h3>
              <p className="text-gray-600"><strong>Order ID:</strong> {order.id}</p>
              <p className="text-gray-600"><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
              <p className="text-gray-600"><strong>Payment Status:</strong> <span className="capitalize">{order.paymentStatus}</span></p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Shipping Information</h3>
              <p className="text-gray-600">{order.shippingInfo.name}</p>
              <p className="text-gray-600">{order.shippingInfo.address}</p>
              <p className="text-gray-600">{order.shippingInfo.city}, {order.shippingInfo.zip}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Items Purchased</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
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
              </div>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              onClick={() => navigate("/products")}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-md hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate("/order-history")}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-md hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              View Order History
            </button>
            <button
              onClick={() => navigate(`/orders/${order.id}`)}
              className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 rounded-md hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              View Order Details
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderConfirmationPage;