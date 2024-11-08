// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProductDetails from './products/ProductDetails';
import Wishlist from './wishlist/Wishlist';
import Cart from './cart/Cart';
import ProductList from './products/ProductList';
import Header from './header/Headers';
import Login from './signin/Login';
import Register from './signin/Register';
import Footer from './footer/Footers';
import Loading from './loading/Loading';
import CategoryPage from './products/Category';
import Privacy from './help/Privacy';
import Contact from './help/Contact';

const App = () => {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
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

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated API load time
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return <Loading />; // Show loading spinner while loading
  }

  return (
    <Router>
      <Header wishlist={wishlist} cart={cart} user={user} setUser={setUser} />
      <div>
        <Routes>
          <Route path='/' element={<Home addToWishlist={addToWishlist} addToCart={addToCart} wishlist={wishlist} cart={cart} />} />
          <Route path="/product" element={<ProductList addToWishlist={addToWishlist} addToCart={addToCart} wishlist={wishlist} cart={cart} />} />
          <Route path="/product/:id" element={<ProductDetails addToWishlist={addToWishlist} addToCart={addToCart} wishlist={wishlist} cart={cart} />} />
          <Route path="/shop/:category" element={<CategoryPage addToWishlist={addToWishlist} addToCart={addToCart} wishlist={wishlist} cart={cart} />} /> {/* Dynamic Category Route */}
          <Route path="/wishlist" element={<Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
