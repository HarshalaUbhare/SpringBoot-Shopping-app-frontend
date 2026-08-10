import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.18, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = ({ selectedCategory, searchQuery }) => (
  <Routes>
    <Route path="/" element={<PageTransition><Home selectedCategory={selectedCategory} searchQuery={searchQuery} /></PageTransition>} />
    <Route path="/product/:id" element={<PageTransition><Product /></PageTransition>} />
    <Route path="/product/update/:id" element={<PageTransition><UpdateProduct /></PageTransition>} />
    <Route path="/add-product" element={<PageTransition><AddProduct /></PageTransition>} />
    <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
    <Route path="/order" element={<PageTransition><Order /></PageTransition>} />
    <Route path="/login" element={<Login />} />
  </Routes>
);

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <AnimatedRoutes selectedCategory={selectedCategory} searchQuery={searchQuery} />
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
