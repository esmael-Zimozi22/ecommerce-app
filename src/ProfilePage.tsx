// src/UserProfile.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          setEmail(user.email || "");
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setName(data.name || "");
            setAddress(data.address || "");
          } else {
            await setDoc(userDocRef, {
              email: user.email || "",
              name: "",
              address: "",
            });
          }
        } catch (err) {
          setError("Failed to load profile data.");
          console.error("Error fetching user data:", err);
        }
      } else {
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleUpdateProfile = async () => {
    const user = auth.currentUser;
    if (!user) {
      setError("You must be logged in to update your profile.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(
        userDocRef,
        {
          name,
          address,
          email: user.email,
        },
        { merge: true }
      );
      setSuccess("Profile updated successfully!");
      setError(null);
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      console.error("Update error:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      setError("Failed to log out. Please try again.");
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-indigo-900 text-white shadow-lg fixed w-full top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight animate-slideIn">My Profile</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/home")}
              className="bg-indigo-100 text-indigo-800 px-5 py-2 rounded-lg hover:bg-indigo-200 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Back to Home
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 pt-28 pb-16">
        <div className="bg-white rounded-xl shadow-xl p-8 animate-fadeInUp border border-indigo-100">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
            <div className="relative">
              <div className="w-36 h-36 rounded-full bg-indigo-50 flex items-center justify-center shadow-lg border-4 border-indigo-300 overflow-hidden">
                <img
                  src="https://media.giphy.com/media/26FPJGjAwuSikuukE/giphy.gif" // New GIF: shopping bag animation
                  alt="Profile GIF"
                  className="w-28 h-28"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                Elite
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-2">{name || "User"}</h2>
              <p className="text-gray-700 text-xl">{email || "No email provided"}</p>
              {address && (
                <p className="text-gray-700 text-xl mt-1">
                  <span className="font-semibold">Address:</span> {address}
                </p>
              )}
            </div>
          </div>

          {/* Profile Form */}
          <div className="space-y-8">
            {error && (
              <p className="text-red-600 bg-red-50 p-4 rounded-lg text-base font-medium animate-fadeIn">
                {error}
              </p>
            )}
            {success && (
              <p className="text-indigo-600 bg-indigo-50 p-4 rounded-lg text-base font-medium animate-fadeIn">
                {success}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-md hover:shadow-lg placeholder-gray-400 text-gray-800 bg-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your email"
                  value={email}
                  disabled
                  className="w-full px-5 py-3 rounded-lg border border-indigo-300 bg-gray-100 text-gray-600 cursor-not-allowed transition-all duration-300 shadow-md"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-gray-800 font-semibold mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-5 py-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-md hover:shadow-lg placeholder-gray-400 text-gray-800 bg-white"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleUpdateProfile}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Update Profile
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/order-history")}
                className="w-full sm:w-auto bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Order History
              </button>
              <button
                onClick={() => navigate("/products")}
                className="w-full sm:w-auto bg-gray-700 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-in-out; }
        .animate-slideIn { animation: slideIn 0.8s ease-in-out; }
      `}</style>
    </div>
  );
};

export default UserProfile;