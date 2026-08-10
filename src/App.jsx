import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "./Context/Context";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Product from "./components/Product";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import Cart from "./components/Cart";
import Order from "./components/Order";

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.18, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = ({ selectedCategory }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={<PageTransition><Home selectedCategory={selectedCategory} /></PageTransition>}
        />
        <Route path="/product/:id" element={<PageTransition><Product /></PageTransition>} />
        <Route path="/product/update/:id" element={<PageTransition><UpdateProduct /></PageTransition>} />
        <Route path="/add-product" element={<PageTransition><AddProduct /></PageTransition>} />
        <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
        <Route path="/order" element={<PageTransition><Order /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <AnimatedRoutes selectedCategory={selectedCategory} />
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
