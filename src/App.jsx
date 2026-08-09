import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "./Context/Context";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Product from "./components/Product";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import Cart from "./components/Cart";
import Order from "./components/Order";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Routes>
          <Route
            path="/"
            element={<Home selectedCategory={selectedCategory} />}
          />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/product/update/:id" element={<UpdateProduct />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
