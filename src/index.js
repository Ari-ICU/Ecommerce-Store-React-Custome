// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';  // Use the new 'react-dom/client' import
import App from './App';
import { StripeProvider } from './context/StripeContext';

// Create root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StripeProvider>
    <App />
  </StripeProvider>
);
