import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Headers.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import logo from './img/zando-logo-small.png';

const Header = ({ wishlist, cart, user, setUser }) => {
    const [categories, setCategories] = useState([]);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then((res) => res.json())
            .then((json) => setCategories(json))
            .catch((error) => console.error('Error fetching categories:', error));

        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        setUser(null);
    };

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="logo" className="navbar-logo" />
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded={isNavbarOpen}
                    aria-label="Toggle navigation"
                    onClick={toggleNavbar}
                >
                    <span className="">
                        {isNavbarOpen ? (
                            <i className="fas fa-times"></i> // Icon for close
                        ) : (
                            <i className="fas fa-bars"></i>  // Icon for open
                        )}
                    </span>
                </button>

                <div className="collapse navbar-collapse p-2" id="navbarNav">
                    <ul className="navbar-nav ms-auto text-center">
                        {/* Collection Link */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/product">Collection</Link>
                        </li>

                        {/* Shop Dropdown */}
                        {!isMobile ? (
                            // Desktop view with dropdown
                            <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle" id="shopDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Shop
                                </span>
                                <ul className="dropdown-menu" aria-labelledby="shopDropdown">
                                    {categories.map((category) => (
                                        <li key={category}>
                                            <Link className="dropdown-item" to={`/shop/${category}`}>
                                                {category.charAt(0).toUpperCase() + category.slice(1)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ) : (
                            // Mobile view with inline list of categories
                            categories.map((category) => (
                                <li className="nav-item" key={category}>
                                    <Link className="nav-link" to={`/shop/${category}`}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </Link>
                                </li>
                            ))
                        )}

                        {/* Wishlist and Cart always visible, both in mobile and desktop view */}
                        <div className="col-log-register">
                            <li className="nav-item me-2">
                                <Link className="nav-link" to="/wishlist">
                                    <i className="fas fa-heart"></i>
                                    {wishlist.length > 0 && (
                                        <span className="badge bg-danger ms-1">{wishlist.length}</span>
                                    )}
                                </Link>
                            </li>
                            <li className="nav-item me-2">
                                <Link className="nav-link" to="/cart">
                                    <i className="fas fa-shopping-cart"></i>
                                    {cart.length > 0 && (
                                        <span className="badge bg-danger ms-1">{cart.length}</span>
                                    )}
                                </Link>
                            </li>

                            {/* User Authentication */}
                            {user ? (
                                <li className="nav-item">
                                    <span className="nav-link">Welcome, {user.username}</span>
                                    <button onClick={handleLogout} className="btn btn-link nav-link">
                                        Logout
                                    </button>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        <i className="fas fa-user"></i> Login
                                    </Link>
                                </li>
                            )}

                            <li className="nav-item">
                                <Link className="btn btn-outline-primary ms-2" to="/register">
                                    Register
                                </Link>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
