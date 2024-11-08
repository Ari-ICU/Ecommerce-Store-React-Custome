// StripeContext.js
import React, { createContext } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Load your Stripe publishable key
const stripePromise = loadStripe('your-publishable-key-here');

// Create Stripe context
export const StripeContext = createContext();

export const StripeProvider = ({ children }) => (
    <StripeContext.Provider value={{ stripe: stripePromise }}>
        <Elements stripe={stripePromise}>
            {children}
        </Elements>
    </StripeContext.Provider>
);
