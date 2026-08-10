import { useState, useEffect } from "react";
import { ClipboardCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CheckoutPopup = ({ show, handleClose, cartItems, totalPrice, handleCheckout, user }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (show && user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [show, user]);
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
          <DialogTitle className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent2 shadow-glow-sm">
              <ClipboardCheck className="h-4 w-4 text-white" />
            </span>
            Confirm Checkout
          </DialogTitle>
        </DialogHeader>

        {/* Customer details */}
        <div className="space-y-3">
          <div>
            <Label className="mb-1 block">Full Name</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>
          <div>
            <Label className="mb-1 block">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
            />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>
        </div>

        {/* Order summary */}
        <p className="text-sm font-medium">Order summary</p>
        <ul className="max-h-48 space-y-1 overflow-y-auto rounded-lg border border-white/10 bg-white/[0.02] p-2 text-sm">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between rounded-md px-2 py-1.5 transition-colors hover:bg-white/5">
              <span>{item.name} × {item.quantity}</span>
              <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between border-t border-white/10 pt-3 text-base font-bold">
          <span>Total</span>
          <span className="text-gradient">₹{totalPrice.toFixed(2)}</span>
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
