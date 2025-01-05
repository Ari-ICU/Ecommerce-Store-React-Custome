import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Headers.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import logo from './img/zando-logo-small.png';

const Header = ({ wishlist, cart, user, setUser }) => {
    const [categories, setCategories] = useState([]);
    const location = useLocation(); // Track route changes

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then((res) => res.json())
            .then((json) => {
                const filteredCategories = json.filter(
                    (category) => category !== 'electronics' && category !== 'jewelery'
                );
                setCategories(filteredCategories);
            })
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div className="container-fluid">
                {/* Logo */}
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Logo" className="navbar-logo" />
                </Link>

                {/* Wishlist and Cart for Mobile */}
                <div className="d-flex d-lg-none align-items-center">
                    <Link className="nav-link position-relative" to="/wishlist">
                        <i className="fas fa-heart"></i>
                        {wishlist.length > 0 && (
                            <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                                {wishlist.length}
                            </span>
                        )}
                    </Link>
                    <Link className="nav-link position-relative ms-3" to="/cart">
                        <i className="fas fa-shopping-cart"></i>
                        {cart.length > 0 && (
                            <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                                {cart.length}
                            </span>
                        )}
                    </Link>
                </div>

                {/* Navbar Toggler */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Collapsible Menu */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/product">
                                Collection
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                id="shopDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Shop
                            </Link>
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
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link">Welcome, {user.username}</span>
                                </li>
                                <li className="nav-item">
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-link nav-link text-danger"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <div className="d-flex align-items-center">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        <i className="fas fa-user"></i> Login
                                    </Link>
                                </li>

                            </div>
                        )}
                    </ul>
                </div>

                {/* Wishlist and Cart for Desktop */}
                <div className="d-none d-lg-flex align-items-center ms-3">
                    <Link className="nav-link position-relative" to="/wishlist">
                        <i className="fas fa-heart"></i>
                        {wishlist.length > 0 && (
                            <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                                {wishlist.length}
                            </span>
                        )}
                    </Link>
                    <Link className="nav-link position-relative ms-3" to="/cart">
                        <i className="fas fa-shopping-cart"></i>
                        {cart.length > 0 && (
                            <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                                {cart.length}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;
