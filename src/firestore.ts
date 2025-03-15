
// src/firestore.ts
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

interface Order {
  id: string; // Firestore document ID
  orderId: string; // Stripe Payment Intent ID
  items: { id: string; name: string; quantity: number; price: number; imageUrl?: string }[];
  totalAmount: number;
  paymentStatus: string; // Use paymentStatus to match CheckoutPage.tsx
  createdAt: { seconds: number; nanoseconds: number };
  userId?: string;
  shippingInfo?: {
    name: string;
    address: string;
    city: string;
    zip: string;
  };
}

export const fetchOrder = async (orderId: string): Promise<Order | null> => {
  try {
    console.log("Fetching order with Firestore Document ID:", orderId);
    const ordersRef = collection(db, "orders");

    // Query by Firestore document ID directly
    const q = query(ordersRef, where("__name__", "==", orderId));
    const querySnapshot = await getDocs(q);
    console.log("Query snapshot size (by document ID):", querySnapshot.size);

    if (!querySnapshot.empty) {
      const orderDoc = querySnapshot.docs[0];
      const orderData = orderDoc.data();
      console.log("Order data (by document ID):", orderData);

      // Parse items if stored as a string (unlikely with current CheckoutPage.tsx)
      let items = orderData.items;
      if (typeof orderData.items === "string") {
        try {
          const validJsonString = orderData.items.replace(/'/g, '"').replace(/\\/g, "");
          items = JSON.parse(validJsonString);
          console.log("Parsed order items:", items);
        } catch (error) {
          console.error("Error parsing items:", error);
          items = [];
        }
      }

      return {
        id: orderDoc.id,
        orderId: orderData.orderId || orderDoc.id, // Stripe ID or fallback to Firestore ID
        items,
        totalAmount: orderData.totalAmount || 0,
        paymentStatus: orderData.paymentStatus || "unknown",
        createdAt: orderData.createdAt || { seconds: 0, nanoseconds: 0 },
        userId: orderData.userId,
        shippingInfo: orderData.shippingInfo,
      };
    } else {
      console.log("No order found with Firestore Document ID:", orderId);
      return null;
    }
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};