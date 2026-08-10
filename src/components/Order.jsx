import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ClipboardList, PackageSearch } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const STATUS_VARIANT = {
  PLACED: "info",
  SHIPPED: "default",
  DELIVERED: "success",
  CANCELLED: "destructive",
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);

const calculateOrderTotal = (items) => items.reduce((total, item) => total + item.totalPrice, 0);

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
        setOrders(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [baseUrl]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl space-y-3 px-4 py-8 sm:px-6">
        <Skeleton className="h-8 w-48" />
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center gap-2">
        <ClipboardList className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Order Management</h1>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <PackageSearch className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No orders found</h3>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <Card className="hidden overflow-hidden md:block">
            <CardHeader className="border-b border-border bg-muted/40 py-3">
              <CardTitle className="text-base">Orders ({orders.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Order ID</th>
                    <th className="px-4 py-3 font-medium">Customer</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Items</th>
                    <th className="px-4 py-3 font-medium">Total</th>
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const expanded = expandedOrder === order.orderId;
                    return (
                      <Fragment key={order.orderId}>
                        <tr className="border-b border-border/60">
                          <td className="px-4 py-3 font-semibold">{order.orderId}</td>
                          <td className="px-4 py-3">
                            <p>{order.customerName}</p>
                            <p className="text-xs text-muted-foreground">{order.email}</p>
                          </td>
                          <td className="px-4 py-3">{new Date(order.orderDate).toLocaleDateString()}</td>
                          <td className="px-4 py-3">
                            <Badge variant={STATUS_VARIANT[order.status] || "secondary"}>{order.status}</Badge>
                          </td>
                          <td className="px-4 py-3">{order.items.length}</td>
                          <td className="px-4 py-3 font-bold">{formatCurrency(calculateOrderTotal(order.items))}</td>
                          <td className="px-4 py-3">
                            <Button variant="outline" size="sm" onClick={() => toggleOrderDetails(order.orderId)}>
                              {expanded ? "Hide" : "Details"}
                              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")} />
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={7} className="p-0">
                            <AnimatePresence initial={false}>
                              {expanded ? (
                                <motion.div
                                  key={`details-${order.orderId}`}
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden bg-muted/30"
                                >
                                  <OrderItemsTable items={order.items} />
                                </motion.div>
                              ) : null}
                            </AnimatePresence>
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Mobile card layout */}
          <div className="space-y-3 md:hidden">
            <h3 className="mb-2 font-semibold">Orders ({orders.length})</h3>
            {orders.map((order) => {
              const expanded = expandedOrder === order.orderId;
              return (
                <Card key={order.orderId}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold">Order #{order.orderId}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={STATUS_VARIANT[order.status] || "secondary"}>{order.status}</Badge>
                    </div>
                    <div className="mt-2">
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">{order.email}</p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-bold">{formatCurrency(calculateOrderTotal(order.items))}</span>
                      <Button variant="outline" size="sm" onClick={() => toggleOrderDetails(order.orderId)}>
                        {expanded ? "Hide" : `${order.items.length} item${order.items.length !== 1 ? "s" : ""}`}
                      </Button>
                    </div>
                    <AnimatePresence initial={false}>
                      {expanded ? (
                        <motion.div
                          key={`mobile-details-${order.orderId}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 space-y-1 border-t border-border pt-3">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>
                                  {item.ProductName} × {item.quantity}
                                </span>
                                <span className="font-medium">{formatCurrency(item.totalPrice)}</span>
                              </div>
                            ))}
                            <div className="flex justify-between border-t border-border pt-2 font-bold">
                              <span>Total</span>
                              <span>{formatCurrency(calculateOrderTotal(order.items))}</span>
                            </div>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

const OrderItemsTable = ({ items }) => (
  <div className="p-4">
    <h4 className="mb-2 text-sm font-semibold">Order Items</h4>
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
          <th className="py-2 font-medium">Product</th>
          <th className="py-2 font-medium">Qty</th>
          <th className="py-2 text-right font-medium">Price</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index} className="border-b border-border/60">
            <td className="py-2">{item.ProductName}</td>
            <td className="py-2">{item.quantity}</td>
            <td className="py-2 text-right">{formatCurrency(item.totalPrice)}</td>
          </tr>
        ))}
        <tr className="font-bold">
          <td colSpan={2} className="py-2 text-right">
            Total
          </td>
          <td className="py-2 text-right">{formatCurrency(calculateOrderTotal(items))}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default Order;
