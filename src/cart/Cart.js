// Cart.js
import React from 'react';
import "./Cart.css";
import Payment from './Payment';

const Cart = ({ cart, removeFromCart }) => {
    return (
        <div className="container mt-4">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="row mt-5 mb-5">
                    {cart.map((item) => (
                        <div className="col-md-3 mb-4" key={item.id}>
                            <div className="card h-100">
                                <img src={item.image} className="card-img-top mx-auto" alt={item.title} style={{ height: '200px', objectFit: 'contain' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">${item.price}</p>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Remove from Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Payment Component without needing to wrap in Elements */}
            {cart.length > 0 && (
                <div className="mt-4 mb-4">
                    <h3 className="text-center border-top border-black pt-3 mt-4 ">Proceed to Payment</h3>
                    <Payment />
                </div>
            )}
        </div>
    );
};

export default Cart;
