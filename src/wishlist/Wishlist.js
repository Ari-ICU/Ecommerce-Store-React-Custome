import React from 'react';
import { Link } from 'react-router-dom';

const Wishlist = ({ wishlist, removeFromWishlist }) => {
    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Wishlist</h2>
            {wishlist.length === 0 ? (
                <p className="text-center">Your wishlist is empty.</p>
            ) : (
                <div className="row">
                    {wishlist.map((item) => (
                        <div className="col-12 col-sm-6 col-md-3 mb-4" key={item.id}>
                            <div className="card h-100">
                                <Link to={`/product/${item.id}`}>
                                    <img
                                        src={item.image}
                                        className="card-img-top"
                                        alt={item.title}
                                        style={{ height: '200px', objectFit: 'contain' }}
                                    />
                                </Link>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">${item.price}</p>
                                    <div className="mt-auto">
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => removeFromWishlist(item.id)}
                                        >
                                            <i className="fas fa-heart-broken"></i> Remove
                                        </button>
                                        <Link to={`/product/${item.id}`} className="btn btn-primary ms-2">
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
