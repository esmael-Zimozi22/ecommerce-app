// src/Registration.tsx
import React, { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      navigate("/verify-email");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-indigo-50 to-gray-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-lines.png')] opacity-10 pointer-events-none"></div>

      {/* Registration Card */}
      <div className="relative max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 transform hover:scale-[1.02] transition-all duration-500 animate-fadeInUp z-10">
        {/* Decorative Top Element */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
          <img
            src="https://media.giphy.com/media/3o7TKUM3IgJBX2as9O/giphy.gif" // Creative key GIF
            alt="Key Icon"
            className="w-10 h-10"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mt-8 mb-6 bg-gradient-to-r from-indigo-600 to-gray-800 bg-clip-text text-transparent animate-slideIn">
          Unlock Your Journey
        </h1>

        {/* Form */}
        <div className="space-y-8">
          <div className="relative">
            <label htmlFor="email" className="absolute -top-6 left-3 bg-white px-2 text-indigo-700 font-semibold text-sm transform -rotate-2 shadow-sm rounded">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 rounded-xl border-2 border-indigo-200 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-300 shadow-lg hover:shadow-xl placeholder-indigo-300 text-gray-800 bg-indigo-50"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="absolute -top-6 right-3 bg-white px-2 text-indigo-700 font-semibold text-sm transform rotate-2 shadow-sm rounded">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-xl border-2 border-indigo-200 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-300 shadow-lg hover:shadow-xl placeholder-indigo-300 text-gray-800 bg-indigo-50"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-700 bg-red-100 p-4 rounded-xl text-sm font-medium animate-bounceIn border-l-4 border-red-500">
              {error}
            </p>
          )}

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-4 rounded-xl hover:from-indigo-700 hover:to-indigo-900 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <span>Register Now</span>
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-700 text-sm">
            Already a member?{" "}
            <a
              href="/login"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200 underline decoration-wavy"
            >
              Login here
            </a>
            .
          </p>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.8); }
          60% { opacity: 1; transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-in-out; }
        .animate-slideIn { animation: slideIn 0.8s ease-in-out; }
        .animate-bounceIn { animation: bounceIn 0.6s ease-in-out; }
        .animate-pulse { animation: pulse 2s infinite; }
      `}</style>
    </div>
  );
};

export default Registration;