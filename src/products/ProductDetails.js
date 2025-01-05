import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ProductDetails = ({ addToWishlist, addToCart, wishlist, cart }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch main product by ID
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);

                // Fetch related products by category
                return fetch(`https://fakestoreapi.com/products/category/${data.category}`);
            })
            .then((response) => response.json())
            .then((data) => {

                const filteredRelatedProducts = data.filter((item) => item.id !== parseInt(id));
                setRelatedProducts(filteredRelatedProducts);
                window.scrollTo(0, 0);
            })
            .catch((error) => {
                console.error('Error fetching product details or related products:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div className="container mt-4">
            <div className="mb-3">
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-secondary"
                >
                    <i className="fas fa-arrow-left me-2"></i> {/* Font Awesome left arrow icon */}
                    Back
                </button>
            </div>
            <div className="row">
                <div className="col-md-6">

                    <img src={product.image} alt={product.title} className="img-fluid" style={{ height: '400px', width: "400px", objectFit: 'contain' }} />
                </div>
                <div className="col-md-6">
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Category:</strong> {product.category}</p>

                    {/* Add to Cart Button or Wishlist Button here */}
                    <button
                        className="btn btn-outline-warning me-2"
                        onClick={() => addToWishlist(product)}
                        disabled={wishlist.some((item) => item.id === product.id)}
                    >
                        <i className={`fas fa-heart ${wishlist.some((item) => item.id === product.id) ? 'text-danger' : ''}`}></i> Add to Wishlist
                    </button>

                    <button
                        className="btn btn-outline-success"
                        onClick={() => addToCart(product)}
                        disabled={cart.some((item) => item.id === product.id)}
                    >
                        <i className={`fas fa-shopping-cart ${cart.some((item) => item.id === product.id) ? 'text-success' : ''}`}></i> Add to Cart
                    </button>
                </div>
            </div>

            {/* Related Products Section */}
            <div className="mt-5">
                <h3>Related Products</h3>
                <div className="row">
                    {relatedProducts.length > 0 ? (
                        relatedProducts.map((relatedProduct) => (
                            <div className="col-md-4 mb-4" key={relatedProduct.id}>
                                <div className="card h-100">
                                    <Link to={`/product/${relatedProduct.id}`}>
                                        <img
                                            src={relatedProduct.image}
                                            className="card-img-top"
                                            alt={relatedProduct.title}
                                            style={{ height: '200px', objectFit: 'contain' }}
                                        />
                                    </Link>
                                    <div className="card-body">
                                        <h5 className="card-title">{relatedProduct.title}</h5>
                                        <p className="card-text">${relatedProduct.price}</p>
                                        <Link to={`/product/${relatedProduct.id}`} className="btn btn-primary me-2">
                                            View Details
                                        </Link>
                                        {/* Wishlist Icon */}
                                        <button
                                            className="btn btn-outline-warning me-2"
                                            onClick={() => addToWishlist(relatedProduct)}
                                            disabled={wishlist.some((item) => item.id === relatedProduct.id)}
                                        >
                                            <i className={`fas fa-heart ${wishlist.some((item) => item.id === relatedProduct.id) ? 'text-danger' : ''}`}></i>
                                        </button>

                                        {/* Cart Icon */}
                                        <button
                                            className="btn btn-outline-success"
                                            onClick={() => addToCart(relatedProduct)}
                                            disabled={cart.some((item) => item.id === relatedProduct.id)}
                                        >
                                            <i className={`fas fa-shopping-cart ${cart.some((item) => item.id === relatedProduct.id) ? 'text-success' : ''}`}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No related products found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
