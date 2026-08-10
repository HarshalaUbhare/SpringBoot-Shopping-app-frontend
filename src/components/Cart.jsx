import React, { useContext, useState, useEffect } from "react";
import AppContext from "../Context/Context";
import axios from "axios";
import CheckoutPopup from "./CheckoutPopup";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const baseUrl = (import.meta.env.VITE_BASE_URL || "").replace(/\/$/, "");

  useEffect(() => {
    setCartItems(cart.length ? cart : []);
  }, [cart]);

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
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
      item.id === itemId
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
        : item,
    );
    setCartItems(newCartItems);
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    const newCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(newCartItems);
  };

  const handleCheckout = async () => {
    try {
      for (const item of cartItems) {
        const { imageUrl, imageName, imageData, imageType, quantity, ...rest } =
          item;
        const updatedStockQuantity = item.stockQuantity - item.quantity;

        const updatedProductData = {
          ...rest,
          stockQuantity: updatedStockQuantity,
        };

        const cartProduct = new FormData();
        cartProduct.append(
          "product",
          new Blob([JSON.stringify(updatedProductData)], {
            type: "application/json",
          }),
        );

        await axios
          .put(`${baseUrl}/api/product/${item.id}`, cartProduct, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .catch((error) => {
            console.error("Error updating product:", error);
          });
      }
      clearCart();
      setCartItems([]);
      setShowModal(false);
    } catch (error) {
      console.log("error during checkout", error);
    }
  };

  return (
    <div className="container mt-5 pt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h4 className="mb-0">Shopping Cart</h4>
            </div>
            <div className="card-body p-2 p-md-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-cart-x fs-1 text-muted"></i>
                  <h5 className="mt-3">Your cart is empty</h5>
                  <a href="/" className="btn btn-primary mt-3">
                    Continue Shopping
                  </a>
                </div>
              ) : (
                <>
                  {/* Desktop table */}
                  <div className="d-none d-md-block">
                    <table className="table table-hover align-middle">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src={`${baseUrl}/api/product/${item.id}/image`}
                                  alt={item.name}
                                  className="rounded me-3"
                                  width="60"
                                  height="60"
                                  style={{ objectFit: "cover" }}
                                />
                                <div>
                                  <h6 className="mb-0">{item.name}</h6>
                                  <small className="text-muted">{item.brand}</small>
                                </div>
                              </div>
                            </td>
                            <td>₹ {item.price}</td>
                            <td>
                              <div className="input-group input-group-sm" style={{ width: "110px" }}>
                                <button className="btn btn-outline-secondary" onClick={() => handleDecreaseQuantity(item.id)}>−</button>
                                <input type="text" className="form-control text-center" value={item.quantity} readOnly />
                                <button className="btn btn-outline-secondary" onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                              </div>
                            </td>
                            <td className="fw-bold">₹ {(item.price * item.quantity).toFixed(2)}</td>
                            <td>
                              <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemoveFromCart(item.id)}>
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile card layout */}
                  <div className="d-md-none">
                    {cartItems.map((item) => (
                      <div key={item.id} className="card mb-3">
                        <div className="card-body p-3">
                          <div className="d-flex gap-3 mb-2">
                            <img
                              src={`${baseUrl}/api/product/${item.id}/image`}
                              alt={item.name}
                              width="60"
                              height="60"
                              className="rounded"
                              style={{ objectFit: "cover", flexShrink: 0 }}
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <h6 className="mb-0 text-truncate">{item.name}</h6>
                              <small className="text-muted">{item.brand}</small>
                              <div className="fw-bold mt-1">₹ {item.price}</div>
                            </div>
                            <button
                              className="btn btn-sm btn-outline-danger align-self-start"
                              onClick={() => handleRemoveFromCart(item.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mt-2">
                            <div className="input-group input-group-sm" style={{ width: "120px" }}>
                              <button className="btn btn-outline-secondary" onClick={() => handleDecreaseQuantity(item.id)}>−</button>
                              <input type="text" className="form-control text-center" value={item.quantity} readOnly />
                              <button className="btn btn-outline-secondary" onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                            </div>
                            <span className="fw-bold">Total: ₹ {(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="card mt-3">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Total:</h5>
                        <h5 className="mb-0">₹ {totalPrice.toFixed(2)}</h5>
                      </div>
                    </div>
                  </div>

                  <div className="d-grid mt-4">
                    <Button variant="primary" size="lg" onClick={() => setShowModal(true)}>
                      Proceed to Checkout
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <CheckoutPopup
        show={showModal}
        handleClose={() => setShowModal(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
        handleCheckout={handleCheckout}
      />
    </div>
  );
};

export default Cart;
