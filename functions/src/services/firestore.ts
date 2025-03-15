import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Import your Firebase configuration

interface Order {
  id: string;
  orderId: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  paymentStatus: string;
  shippingInfo: {
    address: string;
    city: string;
    name: string;
    zip: string;
  };
  totalAmount: number;
  userId: string;
  createdAt: { seconds: number; nanoseconds: number };
}

export const fetchOrder = async (orderId: string): Promise<Order | null> => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("orderId", "==", orderId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const orderDoc = querySnapshot.docs[0];
      const orderData = orderDoc.data();

      // Ensure the returned object matches the Order interface
      return {
        id: orderDoc.id,
        orderId: orderData.orderId,
        items: orderData.items,
        paymentStatus: orderData.paymentStatus,
        shippingInfo: orderData.shippingInfo,
        totalAmount: orderData.totalAmount,
        userId: orderData.userId,
        createdAt: orderData.createdAt,
      } as Order;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};