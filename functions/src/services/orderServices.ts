import {db} from "../firebase";

interface Order {
  userId: string;
  items: Array<{productId: string; name: string; quantity: number; price: number}>;
  totalAmount: number;
  paymentStatus: string;
  shippingInfo: {name: string; address: string; city: string; zip: string};
  createdAt: Date;
}

export const saveOrderToFirestore = async (order: Order) => {
  await db.collection("orders").add(order);
};
