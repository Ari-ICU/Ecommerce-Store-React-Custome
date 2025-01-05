import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItem, setCartItem] = useState([]);

    // Load cart from localStorage on initial load
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItem(JSON.parse(storedCart));
        }
    }, []);

    // Add product to the cart
    const addToCart = (product) => {
        const updatedCart = [...cartItem, { ...product, quantity: 1 }];
        setCartItem(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Remove product from the cart
    const removeFromCart = (id) => {
        const updatedCart = cartItem.filter(item => item.id !== id);
        setCartItem(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Update product quantity in the cart
    const updateQuantity = (id, quantity) => {
        const updatedCart = cartItem.map(item =>
            item.id === id ? { ...item, quantity } : item
        );
        setCartItem(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <CartContext.Provider value={{ cartItem, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
