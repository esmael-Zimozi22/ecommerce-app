import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { User, onAuthStateChanged, getRedirectResult, signOut } from "firebase/auth";
import Login from "./Login";
import Home from "./Home";
import Products from "./Products";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import OrderHistory from "./OrderHistory";
import OrderDetails from "./OrderDetails";
import Registration from "./Registration";
import VerifyEmail from "./VerifyEmail";
import ForgotPassword from "./ForgotPassword";
import ProfilePage from "./ProfilePage";
import OrderConfirmationPage from "./OrderConfirmationPage";
import "./index.css";
// import UserProfile from "./ProfilePage";
function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          console.log("Google login successful:", result.user);
          setUser(result.user);
        }
      } catch (error) {
        console.error("Google login error:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is authenticated:", user);
        setUser(user);
      } else {
        console.log("User is not authenticated");
        setUser(null);
      }
      setLoading(false);
    });

    handleRedirectResult();
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/home" /> : <Registration />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Routes */}
      <Route path="/home" element={user ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />} />
      <Route path="/products" element={user ? <Products /> : <Navigate to="/login" />} />
      <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/login" />} />
      <Route path="/checkout" element={user ? <CheckoutPage /> : <Navigate to="/login" />} />
      <Route path="/order-history" element={user ? <OrderHistory /> : <Navigate to="/login" />} /> {/* Changed from /orders */}
      <Route path="/orders/:orderId" element={user ? <OrderDetails /> : <Navigate to="/login" />} />
      <Route path="/order-confirmation" element={user ? <OrderConfirmationPage /> : <Navigate to="/login" />} />
      <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />

      {/* Default Route */}
      <Route path="/" element={<Navigate to={user ? "/home" : "/login"} />} />
    </Routes>
  );
}

// Wrap the App component with Router
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;