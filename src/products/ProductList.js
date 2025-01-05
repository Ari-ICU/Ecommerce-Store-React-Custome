import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Product.css';

const Products = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch product data from API
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="container">Loading...</p>;

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Products</h1>
            <div className="row">
                {products.map((product) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
                        <div className="card h-100">
                            <Link to={`/product/${product.id}`}>
                                <img
                                    src={product.image}
                                    className="card-img-top"
                                    alt={product.title}
                                    style={{ height: '250px', objectFit: 'contain' }}
                                />
                            </Link>
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">${product.price}</p>
                                <Link to={`/product/${product.id}`} className="btn btn-primary mb-2 me-2">
                                    View Details
                                </Link>
                                <button
                                    className="btn btn-outline-success"
                                    onClick={() => addToCart(product)}
                                >
                                    <i className="fas fa-shopping-cart"></i> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
