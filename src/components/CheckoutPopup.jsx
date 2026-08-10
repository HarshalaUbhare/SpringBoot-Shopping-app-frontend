import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const CheckoutPopup = ({ show, handleClose, cartItems, totalPrice, handleCheckout }) => {
  return (
    <Dialog open={show} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Checkout</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">You are about to place an order for:</p>

        <ul className="max-h-64 space-y-1 overflow-y-auto rounded-lg border border-border p-2 text-sm">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between rounded-md px-2 py-1.5">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between border-t border-border pt-3 text-base font-bold">
          <span>Total</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleCheckout}>Confirm Order</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutPopup;
