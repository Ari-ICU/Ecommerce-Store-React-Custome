import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './header/Headers';
import Footer from './footer/Footers';
import ProductDetails from './products/ProductDetails';
import Wishlist from './wishlist/Wishlist';
import CartPage from './cart/Cart';
import Products from './products/ProductList';
import CheckoutForm from './cart/CheckoutForm';
import Login from './signin/Login';
import Home from './components/Home';
import Category from './products/Category';

const App = () => {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    const storedCart = localStorage.getItem('cart');

    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToWishlist = (product) => {
    const updatedWishlist = [...wishlist, product];
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };
  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };


  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      updateQuantity(product.id, existingProduct.quantity + 1);
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(item => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <Router>
      <Header wishlist={wishlist} cart={cart} user={user} setUser={setUser} />
      <div>
        <Routes>
          <Route path='/' element={<Home addToWishlist={addToWishlist} addToCart={addToCart} wishlist={wishlist} cart={cart} />} />
          <Route path='/product' element={<Products addToWishlist={addToWishlist} addToCart={addToCart} wishlist={wishlist} cart={cart} />} />
          <Route path="/product/:id" element={<ProductDetails addToWishlist={addToWishlist} addToCart={addToCart} wishlist={wishlist} cart={cart} />} />
          <Route path="/wishlist" element={<Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} />} />
          <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path='/checkout' element={<CheckoutForm />} />
          <Route path='/shop/:category' element={<Category addToWishlist={addToWishlist} addToCart={addToCart} wishlist={wishlist} cart={cart} />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
