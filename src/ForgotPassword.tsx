import React, { useState } from "react";
import { auth } from "./firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate,Link } from "react-router-dom";
import "./Login.css"; // Reuse the same styles as Login

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (error: any) {
      setError(error.message); // Display error message
    }
  };

  return (
    // <div className="login-container">
    //   <h1 className="login-title">Forgot Password</h1>
    //   <div className="login-form">
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       className="login-input"
    //     />
    //     {message && <p className="success-message">{message}</p>}
    //     {error && <p className="error-message">{error}</p>}
    //     <button onClick={handleResetPassword} className="login-button">
    //       Reset Password
    //     </button>
    //     <p className="register-link">
    //       Remember your password? <Link to="/login">Login here</Link>.
    //     </p>
    //   </div>
    // </div>
    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
    //   <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 transform transition-all hover:scale-105">
    //     <h1 className="text-4xl font-bold text-center text-gray-800 mb-6 tracking-tight">
    //       Forgot Password
    //     </h1>
    //     <div className="space-y-6">
    //       <input
    //         type="email"
    //         placeholder="Enter your email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 bg-gray-50 text-gray-700 placeholder-gray-400"
    //       />
    //       {message && (
    //         <p className="text-center text-green-600 bg-green-100 p-2 rounded-md text-sm font-medium animate-fade-in">
    //           {message}
    //         </p>
    //       )}
    //       {error && (
    //         <p className="text-center text-red-600 bg-red-100 p-2 rounded-md text-sm font-medium animate-fade-in">
    //           {error}
    //         </p>
    //       )}
    //       <button
    //         onClick={handleResetPassword}
    //         className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold text-lg hover:bg-indigo-700 active:bg-indigo-800 transition-all duration-300 shadow-md hover:shadow-lg"
    //       >
    //         Reset Password
    //       </button>
    //       <p className="text-center text-gray-600 text-sm">
    //         Remember your password?{" "}
    //         <Link
    //           to="/login"
    //           className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
    //         >
    //           Login here
    //         </Link>
    //         .
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E0F7FA] via-[#F3E5F5] to-[#FFE0B2] p-4 relative overflow-hidden">
    {/* Animated Wave Background */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      <svg className="w-full h-full animate-wave" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="#ffffff"
          fillOpacity="0.3"
          d="M0,224L48,213.3C96,203,192,181,288,170.7C384,160,480,160,576,170.7C672,181,768,203,864,213.3C960,224,1056,224,1152,213.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    </div>

    {/* Floating Animated Symbols */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      <svg
        className="absolute w-12 h-12 text-[#00BCD4] animate-float top-10 left-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
      <svg
        className="absolute w-12 h-12 text-[#AB47BC] animate-float top-20 right-20"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 11c0-1.1-.9-2-2-2s-2 .9-2 2v2h4v-2zm-2 6a2 2 0 100-4 2 2 0 000 4zm6-6h2a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2h2V9a4 4 0 018 0v2z"
        />
      </svg>
    </div>

    {/* Card Container */}
    <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-xl shadow-2xl p-8 transform transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] relative z-10 border border-white/30">
      {/* Card Header */}
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#00BCD4] via-[#AB47BC] to-[#FF7043] mb-6 tracking-wider animate-gradient">
        Forgot Password
      </h1>

      {/* Form Content */}
      <div className="space-y-6">
        <div className="relative group">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/30 border border-[#E0E0E0] focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4] focus:ring-opacity-50 outline-none transition-all duration-300 text-[#4A4A4A] placeholder-[#A0A0A0] rounded-lg hover:bg-white/40"
          />
          {/* Animated Email Icon */}
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#00BCD4] animate-bounce-slow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        {message && (
          <p className="text-center text-[#00FF00] bg-[#00FF00]/10 p-2 rounded-md text-sm font-medium animate-fade-in">
            {message}
          </p>
        )}
        {error && (
          <p className="text-center text-[#FF4500] bg-[#FF4500]/10 p-2 rounded-md text-sm font-medium animate-fade-in">
            {error}
          </p>
        )}
        <button
          onClick={handleResetPassword}
          className="w-full py-3 bg-gradient-to-r from-[#00BCD4] to-[#AB47BC] text-white rounded-lg font-semibold text-lg hover:from-[#00ACC1] hover:to-[#9C27B0] focus:outline-none focus:ring-4 focus:ring-[#00BCD4] focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#00BCD4]/50 relative overflow-hidden group"
        >
          <span className="relative z-10">Reset Password</span>
          {/* Ripple Effect */}
          <span className="absolute inset-0 bg-[#00BCD4]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full transform scale-0 group-hover:scale-150"></span>
          {/* Animated Lock Icon */}
          <svg
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white animate-spin-slow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 11c0-1.1-.9-2-2-2s-2 .9-2 2v2h4v-2zm-2 6a2 2 0 100-4 2 2 0 000 4zm6-6h2a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2h2V9a4 4 0 018 0v2z"
            />
          </svg>
        </button>
        <p className="text-center text-[#4A4A4A] text-sm">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-[#00BCD4] hover:text-[#00BCD4]/80 font-medium transition-colors duration-300 hover:underline"
          >
            Login here
          </Link>
          .
        </p>
      </div>
    </div>

    {/* Custom Styles and Animations */}
    <style>{`
      @keyframes wave {
        0% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(10deg); }
      }
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes bounceSlow {
        0%, 100% { transform: translateY(-10%); }
        50% { transform: translateY(10%); }
      }
      @keyframes spinSlow {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .animate-wave {
        animation: wave 10s ease-in-out infinite;
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      .animate-gradient {
        background-size: 200% 200%;
        animation: gradient 4s ease infinite;
      }
      .animate-fade-in {
        animation: fadeIn 0.5s ease-in-out;
      }
      .animate-bounce-slow {
        animation: bounceSlow 3s ease-in-out infinite;
      }
      .animate-spin-slow {
        animation: spinSlow 4s linear infinite;
      }
      .group:hover .group-hover\\:opacity-100 {
        opacity: 1;
      }
      .group:hover .group-hover\\:scale-150 {
        transform: scale(1.5);
      }
    `}</style>
  </div>
  );
};

export default ForgotPassword;