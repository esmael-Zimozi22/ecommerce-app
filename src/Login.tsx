// src/Login.tsx
import React, { useState } from "react";
import { auth, googleProvider } from "./firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginAttempted, setIsLoginAttempted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle email/password login
  const handleEmailLogin = async () => {
    setIsLoginAttempted(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        setError("Please verify your email before logging in.");
        await signOut(auth);
        return;
      }
      console.log("Email login successful:", userCredential.user);
      navigate("/home");
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Handle Google login with Popup
  const handleGoogleLogin = async () => {
    setIsLoginAttempted(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google login successful:", result.user);
      navigate("/home");
    } catch (error: any) {
      console.error("Google login error:", error);
      setError("Google login failed: " + error.message);
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
    //   {/* Particle Background */}
    //   <div className="absolute inset-0 z-0 pointer-events-none">
    //     <div className="particles animate-particles"></div>
    //   </div>

    //   {/* Login Card with 3D Effect */}
    //   <div className="relative z-10 bg-gray-800 bg-opacity-90 backdrop-blur-lg rounded-xl p-8 w-full max-w-md shadow-2xl transform transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
    //     {/* Header */}
    //     <div className="text-center mb-8">
    //       <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient">
    //         ShopSphere
    //       </h1>
    //       <p className="text-gray-400 mt-2 text-sm tracking-wide uppercase">Elevate Your Shopping Experience</p>
    //     </div>

    //     {/* Error Message */}
    //     {error && (
    //       <p className="text-red-400 text-center mb-6 bg-red-900 bg-opacity-50 p-3 rounded-lg shadow-inner animate-shake border border-red-500">
    //         {error}
    //       </p>
    //     )}

    //     {/* Form */}
    //     <div className="space-y-8">
    //       {/* Email Field */}
    //       <div className="relative group">
    //         <label className="absolute -top-5 left-3 text-cyan-400 text-sm font-medium tracking-wide transform transition-all duration-300 group-focus-within:-translate-y-1 group-focus-within:text-cyan-300">
    //           Email
    //         </label>
    //         <input
    //           type="email"
    //           placeholder="Your Email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 focus:outline-none transition-all duration-300 placeholder-gray-500 hover:bg-gray-600"
    //         />
    //       </div>

    //       {/* Password Field */}
    //       <div className="relative group">
    //         <label className="absolute -top-5 left-3 text-cyan-400 text-sm font-medium tracking-wide transform transition-all duration-300 group-focus-within:-translate-y-1 group-focus-within:text-cyan-300">
    //           Password
    //         </label>
    //         <input
    //           type="password"
    //           placeholder="Your Password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 focus:outline-none transition-all duration-300 placeholder-gray-500 hover:bg-gray-600"
    //         />
    //       </div>

    //       {/* Sign In Button */}
    //       <button
    //         onClick={handleEmailLogin}
    //         className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-cyan-400 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50"
    //       >
    //         Sign In
    //       </button>

    //       {/* Google Sign In Button */}
    //       <button
    //         onClick={handleGoogleLogin}
    //         className="w-full bg-gray-700 text-white py-3 rounded-lg font-semibold border border-gray-600 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-50 transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg transform hover:scale-105"
    //       >
    //         <svg className="w-6 h-6" viewBox="0 0 24 24">
    //           <path
    //             fill="#4285F4"
    //             d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    //           />
    //           <path
    //             fill="#34A853"
    //             d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.04.69-2.36 1.1-3.71 1.1-2.85 0-5.27-1.92-6.13-4.5H1.5v2.82C3.36 20.31 7.32 23 12 23z"
    //           />
    //           <path
    //             fill="#FBBC05"
    //             d="M5.87 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H1.5C.54 8.43 0 10.13 0 12s.54 3.57 1.5 4.93l4.37-2.84z"
    //           />
    //           <path
    //             fill="#EA4335"
    //             d="M12 4.9c1.56 0 2.96.56 4.06 1.47l3.03-3.03C17.46 1.77 14.97.9 12 .9 7.32.9 3.36 3.69 1.5 7.07l4.37 2.84c.86-2.58 3.28-4.5 6.13-4.5z"
    //           />
    //         </svg>
    //         Sign In with Google
    //       </button>

    //       {/* Links */}
    //       <div className="text-center text-gray-400 space-y-4">
    //         <p>
    //           New to ShopSphere?{" "}
    //           <Link
    //             to="/register"
    //             className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300 hover:underline"
    //           >
    //             Create an account
    //           </Link>
    //         </p>
    //         <p>
    //           Forgot password?{" "}
    //           <Link
    //             to="/forgot-password"
    //             className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300 hover:underline"
    //           >
    //             Reset it here
    //           </Link>
    //         </p>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Custom Styles and Animations */}
    //   <style>{`
    //     .particles {
    //       position: absolute;
    //       inset: 0;
    //       background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%);
    //       animation: particleFlow 20s infinite linear;
    //     }
    //     @keyframes particleFlow {
    //       0% { background-position: 0 0; }
    //       100% { background-position: 100% 100%; }
    //     }
    //     @keyframes shake {
    //       0%, 100% { transform: translateX(0); }
    //       25% { transform: translateX(-5px); }
    //       75% { transform: translateX(5px); }
    //     }
    //     @keyframes gradient {
    //       0% { background-position: 0% 50%; }
    //       50% { background-position: 100% 50%; }
    //       100% { background-position: 0% 50%; }
    //     }
    //     .animate-shake {
    //       animation: shake 0.5s ease-in-out;
    //     }
    //     .animate-gradient {
    //       background-size: 200% 200%;
    //       animation: gradient 4s ease infinite;
    //     }
    //   `}</style>
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
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
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
            d="M3 3h18M3 3v18M21 3v18M9 3v18M15 3v18M3 9h18M3 15h18"
          />
        </svg>
      </div>

      {/* Login Card with Glassmorphism Effect */}
      <div className="relative z-10 bg-white/20 backdrop-blur-lg rounded-xl p-8 w-full max-w-md shadow-2xl transform transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] border border-white/30">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00BCD4] via-[#AB47BC] to-[#FF7043] animate-gradient">
            ShopSphere
          </h1>
          <p className="text-[#4A4A4A] mt-2 text-sm tracking-wide uppercase animate-fade-in">
            Elevate Your Shopping Experience
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-[#FF4500] text-center mb-6 bg-[#FF4500]/10 p-3 rounded-lg shadow-inner animate-shake border border-[#FF4500]">
            {error}
          </p>
        )}

        {/* Form */}
        <div className="space-y-8">
          {/* Email Field */}
          <div className="relative group">
            <label className="absolute -top-5 left-3 text-[#00BCD4] text-sm font-medium tracking-wide transform transition-all duration-300 group-focus-within:-translate-y-1 group-focus-within:text-[#00BCD4]/80">
              Email
            </label>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/30 text-[#4A4A4A] border border-[#E0E0E0] focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4] focus:ring-opacity-50 focus:outline-none transition-all duration-300 placeholder-[#A0A0A0] hover:bg-white/40"
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

          {/* Password Field */}
          <div className="relative group">
            <label className="absolute -top-5 left-3 text-[#00BCD4] text-sm font-medium tracking-wide transform transition-all duration-300 group-focus-within:-translate-y-1 group-focus-within:text-[#00BCD4]/80">
              Password
            </label>
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/30 text-[#4A4A4A] border border-[#E0E0E0] focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4] focus:ring-opacity-50 focus:outline-none transition-all duration-300 placeholder-[#A0A0A0] hover:bg-white/40"
            />
            {/* Animated Password Icon */}
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
                d="M12 11c0-1.1-.9-2-2-2s-2 .9-2 2v2h4v-2zm-2 6a2 2 0 100-4 2 2 0 000 4zm6-6h2a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2h2V9a4 4 0 018 0v2z"
              />
            </svg>
          </div>

          {/* Sign In Button */}
          <button
            onClick={handleEmailLogin}
            className="w-full bg-gradient-to-r from-[#00BCD4] to-[#AB47BC] text-white py-3 rounded-lg font-semibold hover:from-[#00ACC1] hover:to-[#9C27B0] focus:outline-none focus:ring-4 focus:ring-[#00BCD4] focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#00BCD4]/50 relative overflow-hidden group"
          >
            <span className="relative z-10">Sign In</span>
            {/* Ripple Effect */}
            <span className="absolute inset-0 bg-[#00BCD4]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full transform scale-0 group-hover:scale-150"></span>
          </button>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white/30 text-[#4A4A4A] py-3 rounded-lg font-semibold border border-[#E0E0E0] hover:bg-white/40 focus:outline-none focus:ring-4 focus:ring-[#E0E0E0] focus:ring-opacity-50 transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg transform hover:scale-105 relative overflow-hidden group"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.04.69-2.36 1.1-3.71 1.1-2.85 0-5.27-1.92-6.13-4.5H1.5v2.82C3.36 20.31 7.32 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.87 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H1.5C.54 8.43 0 10.13 0 12s.54 3.57 1.5 4.93l4.37-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 4.9c1.56 0 2.96.56 4.06 1.47l3.03-3.03C17.46 1.77 14.97.9 12 .9 7.32.9 3.36 3.69 1.5 7.07l4.37 2.84c.86-2.58 3.28-4.5 6.13-4.5z"
              />
            </svg>
            Sign In with Google
            {/* Ripple Effect */}
            <span className="absolute inset-0 bg-[#E0E0E0]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full transform scale-0 group-hover:scale-150"></span>
          </button>

          {/* Links */}
          <div className="text-center text-[#4A4A4A] space-y-4">
            <p>
              New to ShopSphere?{" "}
              <Link
                to="/register"
                className="text-[#00BCD4] hover:text-[#00BCD4]/80 font-medium transition-colors duration-300 hover:underline"
              >
                Create an account
              </Link>
            </p>
            <p>
              Forgot password?{" "}
              <Link
                to="/forgot-password"
                className="text-[#00BCD4] hover:text-[#00BCD4]/80 font-medium transition-colors duration-300 hover:underline"
              >
                Reset it here
              </Link>
            </p>
          </div>
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
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(-10%); }
          50% { transform: translateY(10%); }
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
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        .animate-bounce-slow {
          animation: bounceSlow 3s ease-in-out infinite;
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

export default Login;