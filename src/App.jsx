import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "./Context/Context";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Product from "./components/Product";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import Cart from "./components/Cart";
import Order from "./components/Order";
import Login from "./components/Login";
import AuthCallback from "./components/AuthCallback";

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.18, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("shopease_token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

const AppShell = ({ selectedCategory, setSelectedCategory, searchQuery, setSearchQuery }) => {
  const { pathname } = useLocation();
  const hideNavbar = pathname === "/login" || pathname === "/auth-callback";

  return (
    <>
      {!hideNavbar && (
        <Navbar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth-callback" element={<AuthCallback />} />
        <Route path="/" element={<ProtectedRoute><PageTransition><Home selectedCategory={selectedCategory} searchQuery={searchQuery} /></PageTransition></ProtectedRoute>} />
        <Route path="/product/:id" element={<ProtectedRoute><PageTransition><Product /></PageTransition></ProtectedRoute>} />
        <Route path="/product/update/:id" element={<ProtectedRoute><PageTransition><UpdateProduct /></PageTransition></ProtectedRoute>} />
        <Route path="/add-product" element={<ProtectedRoute><PageTransition><AddProduct /></PageTransition></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><PageTransition><Cart /></PageTransition></ProtectedRoute>} />
        <Route path="/order" element={<ProtectedRoute><PageTransition><Order /></PageTransition></ProtectedRoute>} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AppProvider>
      <BrowserRouter>
        <AppShell
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
