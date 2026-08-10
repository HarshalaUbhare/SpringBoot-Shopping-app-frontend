import React, { createContext, useState, useCallback, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const baseUrl = (import.meta.env.VITE_BASE_URL || "").replace(/\/$/, "");

  // Restore session on mount
  useEffect(() => {
    const token = localStorage.getItem("shopease_token");
    if (token) {
      const payload = decodeToken(token);
      if (payload && payload.exp * 1000 > Date.now()) {
        setUser({ email: payload.sub, name: payload.name, picture: payload.picture });
      } else {
        localStorage.removeItem("shopease_token");
      }
    }
  }, []);

  // Attach JWT to every outgoing request
  useEffect(() => {
    const id = axios.interceptors.request.use((config) => {
      const token = localStorage.getItem("shopease_token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    return () => axios.interceptors.request.eject(id);
  }, []);

  const login = useCallback((token) => {
    localStorage.setItem("shopease_token", token);
    const payload = decodeToken(token);
    if (payload) {
      setUser({ email: payload.sub, name: payload.name, picture: payload.picture });
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("shopease_token");
    setUser(null);
  }, []);

  const refreshData = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/products`);
      setData(Array.isArray(response.data) ? response.data : []);
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
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider
      value={{ data, isError, cart, addToCart, removeFromCart, clearCart, refreshData, user, login, logout }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
