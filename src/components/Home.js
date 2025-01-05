import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"
import img from './img/2.png'
const Home = ({ addToWishlist, addToCart, wishlist, cart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => {
                const filteredProducts = data.filter(product => product.category !== "electronics" && product.category !== "jewelery");
                setProducts(filteredProducts);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center mt-5">Loading products...</div>;
    }

    // Slice the products array to show only the first 8 products
    // const displayedProducts = products.slice(0, 8);

    return (
        <div className="">
            <header className="text-center d-flex justify-content-center align-items-center mb-5 custom-background">
                <div className="row w-100 m-4">
                    <div
                        className="col-12 col-md-6 d-flex text-black flex-column justify-content-center align-items-center order-1 order-md-0 "

                    >
                        <h1 className=''>Welcome to ZENDO</h1>
                        <p>Your one-stop shop for original clothing in Cambodia.<br /> <span>Explore our exclusive collections from various brands!</span></p>
                        <div className="">
                            <Link to={`/product`} className="btn btn-btn btn-success">
                                Shop Now
                            </Link>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center p-3 order-0 order-md-1">
                        <img
                            src={img}
                            alt="img"
                            className="img-fluid"
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    </div>
                </div>
            </header>

            <div className='container'>
                <div className="row mt-4  p-3">
                    <h2 className='text-center text-uppercase border-2 border-bottom border-primary p-2'>Featured Products</h2>
                    {products.length > 0 ? (
                        products.slice(0, 8).map((product) => (
                            <div className="col-lg-3 col-md-6 mb-4 mt-4 p-2 " key={product.id}>
                                <div className="card h-100">
                                    <Link to={`/product/${product.id}`}>
                                        <img
                                            src={product.image}
                                            className="card-img-top"
                                            alt={product.title}
                                            style={{ height: '200px', objectFit: 'contain' }}
                                        />
                                    </Link>
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title text-danger">{product.title}</h5>
                                        <p className="card-text">${product.price}</p>
                                        <div className="mt-auto">
                                            <Link to={`/product/${product.id}`} className="btn btn-primary me-2">
                                                View
                                            </Link>
                                            {/* Wishlist Icon */}
                                            <button
                                                className="btn btn-outline-warning me-2"
                                                onClick={() => addToWishlist(product)}
                                                disabled={wishlist.some((item) => item.id === product.id)}
                                            >
                                                <i className={`fas fa-heart ${wishlist.some((item) => item.id === product.id) ? 'text-danger' : ''}`}></i>
                                            </button>

                                            {/* Cart Icon */}
                                            <button
                                                className="btn btn-outline-success"
                                                onClick={() => addToCart(product)}
                                                disabled={cart.some((item) => item.id === product.id)}
                                            >
                                                <i className={`fas fa-shopping-cart ${cart.some((item) => item.id === product.id) ? 'text-success' : ''}`}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center mt-4">No products available at the moment. Please check back later!</p>
                    )}
                </div>
            </div>


            {/* Services Section */}
            <section className="mt-5 p-3 container mb-2 bg-secondary text-black bg-opacity-50 service-background">
                <h2 className="text-center mb-4 text-decoration-underline text-uppercase">Our Services</h2>
                <div className="row p-4">
                    <div className="col-md-4 mb-4">
                        <div className="card text-center bg-success p-2 text-white bg-opacity-25">
                            <div className="card-body">
                                <i className="fas fa-paint-brush fa-2x mb-3"></i>
                                <h5 className="card-title">Customization</h5>
                                <p className="card-text">Personalize your clothing with our customization options for a unique touch.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card text-center bg-success p-2 text-white bg-opacity-25">
                            <div className="card-body">
                                <i className="fas fa-truck fa-2x mb-3"></i>
                                <h5 className="card-title">Fast Delivery</h5>
                                <p className="card-text">Enjoy quick and reliable delivery services for your orders.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card text-center bg-success p-2 text-white bg-opacity-25">
                            <div className="card-body">
                                <i className="fas fa-headset fa-2x mb-3"></i>
                                <h5 className="card-title">Customer Support</h5>
                                <p className="card-text">Our dedicated support team is here to assist you with any inquiries.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
