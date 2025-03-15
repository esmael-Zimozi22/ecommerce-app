// src/Products.tsx
import React, { useEffect, useState, useCallback } from "react";
import { db } from "./firebase";
import { collection, getDocs, query, where, limit, startAfter } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";
import { debounce } from "lodash";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState(1);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [addedToCart, setAddedToCart] = useState<Set<string>>(new Set());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(""); // New state for input value

  const fetchProducts = async (pageNumber: number) => {
    setLoading(true);
    setError(null);
    try {
      const productsRef = collection(db, "products");
      let q = query(productsRef, limit(10));

      if (categoryFilter) {
        q = query(productsRef, where("category", "==", categoryFilter), limit(10));
      }

      if (searchQuery) {
        const allProductsSnapshot = await getDocs(categoryFilter ? query(productsRef, where("category", "==", categoryFilter)) : productsRef);
        const allProducts = allProductsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Product));
        const filteredProducts = allProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const paginatedProducts = filteredProducts.slice((pageNumber - 1) * 10, pageNumber * 10);
        setProducts(paginatedProducts);
        setHasNextPage(filteredProducts.length > pageNumber * 10);
        setLastVisible(null);
      } else if (pageNumber > 1 && lastVisible) {
        q = query(productsRef, limit(10), startAfter(lastVisible));
        if (categoryFilter) {
          q = query(productsRef, where("category", "==", categoryFilter), limit(10), startAfter(lastVisible));
        }
        const querySnapshot = await getDocs(q);
        const productsData: Product[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Product));
        setProducts(productsData);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setHasNextPage(querySnapshot.docs.length === 10);
      } else {
        const querySnapshot = await getDocs(q);
        const productsData: Product[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Product));
        setProducts(productsData);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setHasNextPage(querySnapshot.docs.length === 10);
      }
    } catch (error: any) {
      console.error("Error fetching products:", error);
      setError(`Failed to fetch products: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page, categoryFilter]);

  useEffect(() => {
    if (searchQuery) fetchProducts(1);
  }, [searchQuery]);

  const debouncedSearch = useCallback(
    debounce((queryText: string) => {
      setSearchQuery(queryText);
      setPage(1);
    }, 300),
    []
  );

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrl,
      })
    );
    setAddedToCart((prev) => new Set(prev).add(product.id));
    toast.success(
      <div>
        <p>{`${product.name} added to cart!`}</p>
        <button
          onClick={() => navigate("/cart")}
          className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Go to Cart
        </button>
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <ClipLoader color="#4f46e5" size={60} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600 bg-gray-50 min-h-screen">
        <p className="text-xl font-semibold animate-fadeIn">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-600 text-white shadow-lg fixed w-full top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight animate-fadeIn">ShopElite Products</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-200">Found {products.length} items</span>
            <button
              onClick={() => navigate("/home")}
              className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-sm"
            >
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        {/* Filters */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by name or description..."
                value={searchInput} // Controlled input
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  debouncedSearch(e.target.value);
                }}
                className="w-full px-4 py-3 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-gray-700 shadow-sm hover:shadow-md"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
                setSearchQuery(""); // Reset search when category changes
                setSearchInput(""); // Clear input field
              }}
              className="w-full sm:w-1/4 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-gray-700 shadow-sm hover:shadow-md"
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home & Living">Home & Living</option>
              <option value="Books">Books</option>
            </select>
          </div>
          <p className="text-gray-600 mt-2 text-center text-sm">
            {searchQuery ? "Searching... Select a category to reset." : "Filter by category or search above."}
          </p>
        </section>

        {/* Product Grid */}
        {products.length === 0 ? (
          <p className="text-gray-500 text-center text-lg animate-fadeIn">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-full h-56 relative">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{product.name}</h2>
                  <p className="text-gray-600 mb-3 text-sm line-clamp-2">{product.description}</p>
                  <p className="text-indigo-600 font-bold mb-4">${product.price}</p>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      Add to Cart
                    </button>
                    {addedToCart.has(product.id) && (
                      <button
                        onClick={handleViewCart}
                        className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        View Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Pagination */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-center items-center gap-4 bg-white shadow-md rounded-lg mb-8">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 transition-all duration-300 transform hover:scale-105 shadow-sm"
        >
          Previous
        </button>
        <span className="text-gray-700 font-semibold">Page {page}</span>
        <button
          onClick={handleNextPage}
          disabled={!hasNextPage}
          className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 transition-all duration-300 transform hover:scale-105 shadow-sm"
        >
          Next
        </button>
      </div>

      <ToastContainer />
      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-in-out; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-in-out; }
      `}</style>
    </div>
  );
};

export default Products;