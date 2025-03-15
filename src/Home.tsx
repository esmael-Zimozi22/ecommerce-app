// src/Home.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

interface HomeProps {
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Navbar */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-600 text-white shadow-lg fixed w-full top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight animate-fadeIn">ShopElite</h1>
          <nav className="flex space-x-6">
            <button
              onClick={() => navigate("/products")}
              className="px-4 py-2 rounded-full bg-white text-gray-800 font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Shop Now
            </button>
            <button
              onClick={() => navigate("/order-history")}
              className="px-4 py-2 rounded-full bg-white text-gray-600 font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Order History
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="px-4 py-2 rounded-full bg-white text-indigo-600 font-semibold hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105"
            >
              Profile
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-gray-100 to-indigo-50 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left animate-slideInLeft">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Elevate Your Shopping Experience</h2>
            <p className="text-lg text-gray-600 mb-6">
              Discover premium products designed for style, comfort, and innovation—shop with confidence!
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Shopping
            </button>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 animate-slideInRight">
            <img
              src="https://i.postimg.cc/zD7J1z8K/laptop.jpg" // Electronics product image from your Firestore
              alt="Hero Product"
              className="w-full h-auto rounded-lg shadow-xl transform hover:scale-105 transition-all duration-500"
            />
          </div>
        </div>
        {/* Animated Background Element */}
        <div className="absolute inset-0 -z-10 opacity-10 animate-pulse">
          <div className="w-96 h-96 bg-indigo-200 rounded-full absolute top-10 left-10 blur-3xl"></div>
          <div className="w-72 h-72 bg-gray-200 rounded-full absolute bottom-20 right-20 blur-3xl"></div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12 animate-fadeIn">
            Featured Categories
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Electronics",
                img: "https://i.postimg.cc/zD7J1z8K/laptop.jpg", // From your Firestore order (electrons5)
                link: "/products",
              },
              {
                name: "Fashion",
                img: "https://i.postimg.cc/ZYGDRdcN/ph4.jpg", // Replace with your Fashion product image from Firestore
                link: "/products",
              },
              {
                name: "Home & Living",
                img: "https://i.postimg.cc/Qds4gZvx/oldStyle.jpg", // Replace with your Home & Living product image from Firestore
                link: "/products",
              },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <img
                  src={category.img}
                  alt={category.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h4 className="text-xl font-semibold text-gray-800">{category.name}</h4>
                  <button
                    onClick={() => navigate(category.link)}
                    className="mt-2 text-indigo-600 hover:underline"
                  >
                    Explore Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-indigo-500 to-gray-500 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 animate-fadeIn">
          <h3 className="text-3xl font-bold mb-4">Your Perfect Purchase Awaits!</h3>
          <p className="text-lg mb-6">
            Shop now and enjoy curated collections with fast, reliable delivery.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate("/products")}
              className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Shop Now
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="bg-white text-gray-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View Cart
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2025 ShopElite. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Follow us on{" "}
            <a href="#" className="hover:underline">Twitter</a> |{" "}
            <a href="#" className="hover:underline">Instagram</a>
          </p>
        </div>
      </footer>

      {/* Tailwind Animation Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-in-out; }
        .animate-slideInLeft { animation: slideInLeft 1s ease-in-out; }
        .animate-slideInRight { animation: slideInRight 1s ease-in-out; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-in-out; }
        .animate-pulse { animation: pulse 4s infinite; }
      `}</style>
    </div>
  );
};

export default Home;