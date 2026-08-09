import React from "react";
import { Modal, Button } from "react-bootstrap";

const CheckoutPopup = ({ show, handleClose, cartItems, totalPrice, handleCheckout }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Checkout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-3">You are about to place an order for:</p>
        <ul className="list-group mb-3">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between"
            >
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>₹ {(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="d-flex justify-content-between fw-bold fs-5">
          <span>Total:</span>
          <span>₹ {totalPrice.toFixed(2)}</span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCheckout}>
          Confirm Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckoutPopup;
