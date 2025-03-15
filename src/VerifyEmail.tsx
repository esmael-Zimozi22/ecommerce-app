import React, { useEffect } from "react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth"; // Import signOut
import { useNavigate } from "react-router-dom";
import "./VerifyEmail.css";

const VerifyEmail = () => {
  const navigate = useNavigate();

  // Sign out the user after email verification
  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await signOut(auth); // Sign out the user
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };

    handleSignOut();
  }, [navigate]);

  return (
    // <div className="verify-email-container">
    //   <h1>Verify Your Email</h1>
    //   <p>
    //     We’ve sent a verification email to your inbox. Please check your email and
    //     click the link to verify your account.
    //   </p>
    //   <p>
    //     If you didn’t receive the email,{" "}
    //     <button onClick={() => navigate("/resend-verification")}>click here</button> to resend it.
    //   </p>
    //   <button onClick={() => navigate("/login")}>Go to Login</button>
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
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Card Container */}
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-xl shadow-2xl p-8 transform transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] relative z-10 border border-white/30">
        {/* Card Header */}
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#00BCD4] via-[#AB47BC] to-[#FF7043] mb-6 tracking-wider animate-gradient">
          Verify Your Email
        </h1>

        {/* Form Content */}
        <div className="space-y-6">
          <p className="text-center text-[#4A4A4A] text-sm animate-fade-in">
            We’ve sent a verification email to your inbox. Please check your email and click the link to verify your account.
          </p>
          <p className="text-center text-[#4A4A4A] text-sm animate-fade-in">
            If you didn’t receive the email,{" "}
            <button
              onClick={() => navigate("/resend-verification")}
              className="text-[#00BCD4] hover:text-[#00BCD4]/80 font-medium transition-colors duration-300 hover:underline bg-transparent border-none p-0 cursor-pointer"
            >
              click here
            </button>{" "}
            to resend it.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 bg-gradient-to-r from-[#00BCD4] to-[#AB47BC] text-white rounded-lg font-semibold text-lg hover:from-[#00ACC1] hover:to-[#9C27B0] focus:outline-none focus:ring-4 focus:ring-[#00BCD4] focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#00BCD4]/50 relative overflow-hidden group"
          >
            <span className="relative z-10">Go to Login</span>
            {/* Ripple Effect */}
            <span className="absolute inset-0 bg-[#00BCD4]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full transform scale-0 group-hover:scale-150"></span>
            {/* Animated Login Icon */}
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
                d="M11 16l-4-4m0 0l4-4m-4 4h14"
              />
            </svg>
          </button>
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

export default VerifyEmail;