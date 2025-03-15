import { render, screen, waitFor } from "@testing-library/react";
import OrderHistory from "./OrderHistory";
import { getDocs } from "firebase/firestore";

// Mock Firestore
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
}));

describe("OrderHistory", () => {
  it("displays orders when fetched successfully", async () => {
    // Mock Firestore response
    (getDocs as jest.Mock).mockResolvedValue({
      docs: [
        {
          id: "order1",
          data: () => ({
            orderId: "order123",
            items: [{ name: "Product 1", quantity: 2, price: 10 }],
            totalAmount: 20,
            status: "Delivered",
            createdAt: { seconds: 1712345678, nanoseconds: 0 },
          }),
        },
      ],
    });

    render(<OrderHistory />);

    // Wait for orders to be displayed
    await waitFor(() => {
      expect(screen.getByText("Order ID: order123")).toBeInTheDocument();
      expect(screen.getByText("Status: Delivered")).toBeInTheDocument();
      expect(screen.getByText("Total Amount: $20")).toBeInTheDocument();
    });
  });

  it("displays an error message when fetching fails", async () => {
    // Mock Firestore error
    (getDocs as jest.Mock).mockRejectedValue(new Error("Failed to fetch orders."));

    render(<OrderHistory />);

    // Wait for error message to be displayed
    await waitFor(() => {
      expect(screen.getByText("Failed to fetch orders.")).toBeInTheDocument();
    });
  });
});