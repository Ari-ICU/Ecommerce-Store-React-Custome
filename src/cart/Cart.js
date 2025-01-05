import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cart, removeFromCart, updateQuantity }) => {
    const navigate = useNavigate();

    const handleRemoveFromCart = (id) => {
        removeFromCart(id);
    };

    const handleQuantityChange = (id, quantity) => {
        const parsedQuantity = parseInt(quantity, 10) || 1;  // Default to 1 if input is invalid or empty
        updateQuantity(id, parsedQuantity);
    };

    const handleContinueShopping = () => {
        navigate("/product");
    };

    const handleCheckOut = () => {
        navigate("/checkout");
    };

    return (
        <div className="bg-light py-5 min-vh-100">
            <div className="container">
                <h1 className="text-center mb-4">Shopping Cart</h1>
                <div className="row">
                    {cart.length === 0 ? (
                        <div className="col-12">
                            <p className="text-center">Your cart is empty.</p>
                        </div>
                    ) : (

                        cart.map(item => (

                            // Display cart items
                            <div key={item.id} className="col-12 mb-3">

                                {/* Cart Item */}
                                <div className="card">

                                    {/* Cart Item Details */}
                                    <div className="card-body d-flex align-items-center justify-content-between">
                                        <img src={item.image} alt={item.title} className="img-fluid " style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                        <div className="flex-grow-1 d-flex justify-content-between align-items-center ms-3">
                                            <h5 className="card-title">{item.title}</h5>
                                            <p className="card-text">Price: ${item.price.toFixed(2)}</p>
                                            <p className="card-text">
                                                Quantity:
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                    min="1"
                                                    className="form-control d-inline-block w-auto ml-2"
                                                />
                                            </p>
                                        </div>
                                        <button
                                            className="btn btn-danger ms-3"
                                            onClick={() => handleRemoveFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="row mt-4">
                    <div className="col-12 text-center d-flex justify-content-between">
                        <button className="btn btn-secondary mr-2" onClick={handleContinueShopping}>
                            Continue Shopping
                        </button>
                        <button className="btn btn-primary" onClick={handleCheckOut}>
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;