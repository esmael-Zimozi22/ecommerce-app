// src/OrderHistory.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db, auth } from "./firebase";
import { ClipLoader } from "react-spinners";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface Order {
  id: string;
  orderId: string;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: string;
  createdAt: { seconds: number; nanoseconds: number };
  userId?: string;
  shippingInfo?: {
    name: string;
    address: string;
    city: string;
    zip: string;
  };
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserOrders = async () => {
      const userId = auth.currentUser?.uid;
      console.log("Authenticated User ID in OrderHistory:", userId);

      if (!userId) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }

      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("userId", "==", userId), orderBy("createdAt", "desc"));

      try {
        const querySnapshot = await getDocs(q);
        console.log("Query Snapshot Size:", querySnapshot.size);

        if (querySnapshot.empty) {
          console.log("No orders found for user:", userId);
          setOrders([]);
        } else {
          const ordersData = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            console.log("Order Data for ID", doc.id, ":", data);
            return {
              id: doc.id,
              orderId: data.orderId || doc.id,
              items: Array.isArray(data.items) ? data.items : [],
              totalAmount: data.totalAmount || 0,
              paymentStatus: data.paymentStatus || "unknown",
              createdAt: data.createdAt || { seconds: 0, nanoseconds: 0 },
              userId: data.userId,
              shippingInfo: data.shippingInfo,
            };
          });
          console.log("Fetched Orders:", ordersData);
          setOrders(ordersData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders: ", error);
        setError("Failed to fetch orders.");
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-600 text-white shadow-lg fixed w-full top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight animate-fadeIn">Order History</h1>
          <button
            onClick={() => navigate("/home")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-sm"
          >
            Back to Home
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        {orders.length === 0 ? (
          <div className="text-center mt-10 animate-fadeIn">
            <p className="text-gray-500 text-lg mb-4">You have no past orders.</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-[1.02] transition-all duration-300 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Order #{order.orderId}</h2>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.paymentStatus === "succeeded"
                          ? "bg-green-100 text-green-800"
                          : order.paymentStatus === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Date: {new Date(order.createdAt.seconds * 1000).toLocaleString()}
                  </p>
                  <div className="space-y-4 mb-6">
                    {Array.isArray(order.items) && order.items.length > 0 ? (
                      order.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-md shadow-sm"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-sm">
                              No Image
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="text-gray-800 font-semibold">{item.name}</p>
                            <p className="text-gray-600 text-sm">
                              ${item.price.toFixed(2)} x {item.quantity} = $
                              {(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600 text-sm">No items found for this order.</p>
                    )}
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                    <p className="text-gray-800 font-bold text-lg">
                      Total: ${order.totalAmount.toFixed(2)}
                    </p>
                    <Link
                      to={`/orders/${order.id}`}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-8 text-center">
              <button
                onClick={() => navigate("/products")}
                className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
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

export default OrderHistory;