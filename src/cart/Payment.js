import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Payment.css';

const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        setLoading(false);

        if (error) {
            setErrorMessage(error.message);
        } else {
            setSuccessMessage('Payment was successful!');
            console.log('Payment Method:', paymentMethod);
            // TODO: Send paymentMethod.id to your server for further processing.
        }
    };

    return (
        <div className="payment-container">
            <form onSubmit={handleSubmit} className="payment-form">
                <CardElement className="card-element" />

                {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}

                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="btn btn-primary mt-4"
                >
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
            </form>
        </div>
    );
};

export default Payment;
