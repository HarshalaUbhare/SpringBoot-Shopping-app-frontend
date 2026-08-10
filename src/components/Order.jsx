import axios from "axios";
import React, { useEffect, useState } from "react";

const Order = () => {
  const baseUrl = (import.meta.env.VITE_BASE_URL || "").replace(/\/$/, "");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/orders`);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch orders. Please try again later.");
        setLoading(false);
      }
    };
    fetchOrders();
  }, [baseUrl]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "PLACED": return "bg-info";
      case "SHIPPED": return "bg-primary";
      case "DELIVERED": return "bg-success";
      case "CANCELLED": return "bg-danger";
      default: return "bg-secondary";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const calculateOrderTotal = (items) =>
    items.reduce((total, item) => total + item.totalPrice, 0);

  if (loading) {
    return (
      <div className="container mt-5 pt-5 d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 pt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-4 px-2 px-md-3">
      <h2 className="text-center mb-4 fs-4 fs-md-2">Order Management</h2>

      {orders.length === 0 ? (
        <div className="text-center text-muted py-5">No orders found</div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="card shadow mb-4 d-none d-md-block">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Orders ({orders.length})</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <React.Fragment key={order.orderId}>
                        <tr>
                          <td><span className="fw-bold">{order.orderId}</span></td>
                          <td>
                            <div>{order.customerName}</div>
                            <div className="text-muted small">{order.email}</div>
                          </td>
                          <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                          <td>
                            <span className={`badge ${getStatusClass(order.status)}`}>{order.status}</span>
                          </td>
                          <td>{order.items.length}</td>
                          <td className="fw-bold">{formatCurrency(calculateOrderTotal(order.items))}</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary" onClick={() => toggleOrderDetails(order.orderId)}>
                              {expandedOrder === order.orderId ? "Hide" : "Details"}
                            </button>
                          </td>
                        </tr>
                        {expandedOrder === order.orderId && (
                          <tr>
                            <td colSpan="7" className="p-0">
                              <div className="bg-light p-3">
                                <h6 className="mb-3">Order Items</h6>
                                <table className="table table-sm table-bordered mb-0">
                                  <thead className="table-secondary">
                                    <tr>
                                      <th>Product</th>
                                      <th>Qty</th>
                                      <th>Price</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {order.items.map((item, index) => (
                                      <tr key={index}>
                                        <td>{item.ProductName}</td>
                                        <td className="text-center">{item.quantity}</td>
                                        <td className="text-end">{formatCurrency(item.totalPrice)}</td>
                                      </tr>
                                    ))}
                                    <tr className="table-info">
                                      <td colSpan="2" className="text-end fw-bold">Total</td>
                                      <td className="text-end fw-bold">{formatCurrency(calculateOrderTotal(order.items))}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Mobile card layout */}
          <div className="d-md-none">
            <h5 className="mb-3">Orders ({orders.length})</h5>
            {orders.map((order) => (
              <div key={order.orderId} className="card shadow-sm mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <span className="fw-bold">Order #{order.orderId}</span>
                      <div className="text-muted small">{new Date(order.orderDate).toLocaleDateString()}</div>
                    </div>
                    <span className={`badge ${getStatusClass(order.status)}`}>{order.status}</span>
                  </div>
                  <div className="mb-1">
                    <span className="fw-semibold">{order.customerName}</span>
                    <div className="text-muted small">{order.email}</div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="fw-bold">{formatCurrency(calculateOrderTotal(order.items))}</span>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => toggleOrderDetails(order.orderId)}
                    >
                      {expandedOrder === order.orderId ? "Hide" : `${order.items.length} item${order.items.length !== 1 ? "s" : ""}`}
                    </button>
                  </div>
                  {expandedOrder === order.orderId && (
                    <div className="mt-3 pt-3 border-top">
                      {order.items.map((item, index) => (
                        <div key={index} className="d-flex justify-content-between small py-1">
                          <span>{item.ProductName} × {item.quantity}</span>
                          <span className="fw-semibold">{formatCurrency(item.totalPrice)}</span>
                        </div>
                      ))}
                      <div className="d-flex justify-content-between fw-bold border-top pt-2 mt-1">
                        <span>Total</span>
                        <span>{formatCurrency(calculateOrderTotal(order.items))}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Order;
