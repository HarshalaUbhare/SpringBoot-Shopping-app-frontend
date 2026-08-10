import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import AppContext from "../Context/Context";
import axios from "axios";
import CheckoutPopup from "./CheckoutPopup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, removeFromCart, clearCart, user } = useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const baseUrl = (import.meta.env.VITE_BASE_URL || "").replace(/\/$/, "");

  useEffect(() => {
    setCartItems(cart.length ? cart : []);
  }, [cart]);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const handleIncreaseQuantity = (itemId) => {
    const newCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        if (item.quantity < item.stockQuantity) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          toast.info("Cannot add more than available stock");
        }
      }
      return item;
    });
    setCartItems(newCartItems);
  };

  const handleDecreaseQuantity = (itemId) => {
    const newCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
    );
    setCartItems(newCartItems);
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleCheckout = async (customerName, email) => {
    try {
      const orderRequest = {
        customerName,
        email,
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      await axios.post(`${baseUrl}/api/orders/place`, orderRequest);

      toast.success(`Order placed! Confirmation sent to ${email}`);
      clearCart();
      setCartItems([]);
      setShowModal(false);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mx-auto max-w-5xl px-4 py-8 sm:px-6"
    >
      <Card>
        <CardHeader className="border-b border-white/[0.06]">
          <CardTitle className="flex items-center gap-2 text-xl">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Shopping Cart
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted ring-1 ring-white/10">
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">Your cart is empty</h3>
              <Button asChild className="mt-2">
                <Link to="/">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06] text-left text-xs uppercase tracking-wide text-muted-foreground">
                      <th className="py-2 font-medium">Product</th>
                      <th className="py-2 font-medium">Price</th>
                      <th className="py-2 font-medium">Quantity</th>
                      <th className="py-2 font-medium">Total</th>
                      <th className="py-2 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence initial={false}>
                      {cartItems.map((item) => (
                        <motion.tr
                          key={item.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.02]"
                        >
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={`${baseUrl}/api/product/${item.id}/image`}
                                alt={item.name}
                                className="h-14 w-14 rounded-lg border border-white/[0.06] object-cover"
                              />
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-xs text-muted-foreground">{item.brand}</p>
                              </div>
                            </div>
                          </td>
                          <td>₹{item.price}</td>
                          <td>
                            <QuantityStepper
                              value={item.quantity}
                              onDecrease={() => handleDecreaseQuantity(item.id)}
                              onIncrease={() => handleIncreaseQuantity(item.id)}
                            />
                          </td>
                          <td className="font-bold text-gradient">₹{(item.price * item.quantity).toFixed(2)}</td>
                          <td>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => handleRemoveFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              {/* Mobile card layout */}
              <div className="space-y-3 md:hidden">
                <AnimatePresence initial={false}>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
                    >
                      <div className="flex gap-3">
                        <img
                          src={`${baseUrl}/api/product/${item.id}/image`}
                          alt={item.name}
                          className="h-14 w-14 shrink-0 rounded-lg border border-white/[0.06] object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.brand}</p>
                          <p className="mt-1 font-bold">₹{item.price}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 self-start text-destructive hover:bg-destructive/10"
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <QuantityStepper
                          value={item.quantity}
                          onDecrease={() => handleDecreaseQuantity(item.id)}
                          onIncrease={() => handleIncreaseQuantity(item.id)}
                        />
                        <span className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <motion.div
                key={totalPrice}
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                className="mt-6 flex items-center justify-between rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 to-accent2/5 p-4"
              >
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-gradient">₹{totalPrice.toFixed(2)}</span>
              </motion.div>

              <Button size="lg" className="mt-4 w-full" onClick={() => setShowModal(true)}>
                Proceed to Checkout
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <CheckoutPopup
        show={showModal}
        handleClose={() => setShowModal(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
        handleCheckout={handleCheckout}
        user={user}
      />
    </motion.div>
  );
};

const QuantityStepper = ({ value, onDecrease, onIncrease }) => (
  <div className="flex w-fit items-center rounded-lg border border-white/10 bg-white/[0.03]">
    <button
      onClick={onDecrease}
      className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
    >
      <Minus className="h-3.5 w-3.5" />
    </button>
    <motion.span key={value} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="w-8 text-center text-sm font-medium">
      {value}
    </motion.span>
    <button
      onClick={onIncrease}
      className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
    >
      <Plus className="h-3.5 w-3.5" />
    </button>
  </div>
);

export default Cart;
