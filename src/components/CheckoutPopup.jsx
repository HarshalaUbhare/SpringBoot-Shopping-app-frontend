import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const CheckoutPopup = ({ show, handleClose, cartItems, totalPrice, handleCheckout }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleConfirm = () => {
    if (!validate()) return;
    handleCheckout(name.trim(), email.trim());
    setName("");
    setEmail("");
    setErrors({});
  };

  const handleDialogClose = () => {
    setName("");
    setEmail("");
    setErrors({});
    handleClose();
  };

  return (
    <Dialog open={show} onOpenChange={(open) => !open && handleDialogClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Checkout</DialogTitle>
        </DialogHeader>

        {/* Customer details */}
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>
        </div>

        {/* Order summary */}
        <p className="text-sm font-medium">Order summary</p>
        <ul className="max-h-48 space-y-1 overflow-y-auto rounded-lg border border-border p-2 text-sm">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between rounded-md px-2 py-1.5">
              <span>{item.name} × {item.quantity}</span>
              <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between border-t border-border pt-3 text-base font-bold">
          <span>Total</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm Order</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutPopup;
