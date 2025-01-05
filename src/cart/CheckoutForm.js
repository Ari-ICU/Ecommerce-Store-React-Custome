import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import './Payment.css'; // Make sure to create and import a CSS file

const CheckoutForm = () => {
    const { cartItem, emptyCart } = useContext(CartContext);
    const [isShippingDifferent, setIsShippingDifferent] = useState(false);
    const [createAccount, setCreateAccount] = useState(false);

    // Calculate total amount from cart items
    const totalAmount = cartItem.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // Handle account creation toggle
    const handleCreateAccountToggle = () => {
        setCreateAccount(!createAccount);
    };

    const handlePaymentSuccess = (details, data) => {
        alert(`Transaction completed by ${details.payer.name.given_name}`);
        console.log("Transaction Details:", details, data);
        emptyCart();
    };

    // Initial PayPal options
    const initialPayPalOptions = {
        "client-id": "AZsg0CU6mNHveGmpF90bMucCtWGs2ZKPUKg7B2iQzzFYvQoYcH2p_L_MREqXMJgYPtjeZ43Fq11uDhIf",
        currency: "USD",
    };

    return (
        <div>
            {/* Page Header */}
            <div className="bg-light py-5">
                <div className="container text-center">
                    <p className="h4 text-muted">Fresh and Organic</p>
                    <h1 className="display-4 font-weight-bold text-dark">Check Out Product</h1>
                </div>
            </div>

            {/* Checkout Section */}
            <div className="checkout-section py-5">
                <div className="container">
                    <form>
                        <div className="form-row  ">
                            {/* Billing Form */}
                            <div className="billing-info">
                                <h3 className="h5 font-weight-bold text-dark mb-4">Billing Information</h3>
                                <div className="form-group mb-4">
                                    <label className="text-muted" htmlFor="billing-name">
                                        Name on Card
                                    </label>
                                    <input
                                        type="text"
                                        name="billing-name"
                                        id="billing-name"
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label className="text-muted" htmlFor="card">
                                        Credit Card Number
                                    </label>
                                    <input
                                        type="text"
                                        name="card"
                                        id="card"
                                        required
                                        className="form-control"
                                    />
                                </div>
                                {/* Toggle Account Creation */}
                                <div className="form-check mb-4">
                                    <input
                                        type="checkbox"
                                        id="create-account"
                                        checked={createAccount}
                                        onChange={handleCreateAccountToggle}
                                        className="form-check-input"
                                    />
                                    <label htmlFor="create-account" className="form-check-label text-muted">
                                        Create an account?
                                    </label>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="order-summary ml-5  ">
                                <h3 className="h5 font-weight-bold text-dark mb-4">Order Summary</h3>
                                <ul className="list-group mb-4">
                                    {cartItem.map(item => (
                                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="my-0">{item.title}</h6>
                                                <small className="text-muted">Quantity: {item.quantity}</small>
                                            </div>
                                            <span className="text-muted">${(item.price * item.quantity).toFixed(2)}</span>
                                        </li>
                                    ))}
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Total (USD)</span>
                                        <strong>${totalAmount.toFixed(2)}</strong>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="paypal-button mt-5">
                            {/* PayPal Buttons */}
                            <PayPalScriptProvider options={initialPayPalOptions}>
                                <PayPalButtons
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: totalAmount.toFixed(2),
                                                    },
                                                },
                                            ],
                                        });
                                    }}
                                    onApprove={handlePaymentSuccess}
                                />
                            </PayPalScriptProvider>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;