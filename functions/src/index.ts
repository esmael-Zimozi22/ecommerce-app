import * as functions from "firebase-functions"; // v1 import
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});

interface Order {
  userId: string;
  orderId: string;
  totalAmount: number;
  paymentStatus: string;
  shippingInfo: {
    name: string;
    address: string;
    city: string;
    zip: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export const sendOrderConfirmationEmail = functions.firestore
  .document("orders/{orderId}")
  .onCreate(async (snapshot) => {
    const order = snapshot.data() as Order;
    const user = await admin.auth().getUser(order.userId);

    const mailOptions = {
      from: "your-email@gmail.com",
      to: user.email,
      subject: "Order Confirmation",
      html: `
        <h1>Thank you for your order!</h1>
        <p>Order ID: ${order.orderId}</p>
        <p>Total Amount: $${order.totalAmount.toFixed(2)}</p>
        <p>Status: ${order.paymentStatus}</p>
        <h2>Shipping Information</h2>
        <p>Name: ${order.shippingInfo.name}</p>
        <p>Address: ${order.shippingInfo.address}</p>
        <p>City: ${order.shippingInfo.city}</p>
        <p>Zip Code: ${order.shippingInfo.zip}</p>
        <h2>Items:</h2>
        <ul>
          ${order.items
    .map(
      (item) =>
        `<li>${item.name} x ${item.quantity} - $${
          item.price * item.quantity
        }</li>`
    )
    .join("")}
        </ul>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent to:", user.email);
  });
