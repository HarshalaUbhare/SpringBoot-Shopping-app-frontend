import React, { createContext, useState, useCallback } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [cart, setCart] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const refreshData = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/products`);
      setData(response.data);
      setIsError(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsError(true);
    }
  }, [baseUrl]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider
      value={{ data, isError, cart, addToCart, removeFromCart, clearCart, refreshData }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
