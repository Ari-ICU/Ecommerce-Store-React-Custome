import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        // Cleanup the timer
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <p className='container'></p>;
    return (
        <footer className="bg-light text-center text-lg-start  border border-primary p-3">
            <div className="container p-4">
                <div className="row">
                    <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase">About Us</h5>
                        <p>
                            We are committed to providing the best products at the best prices.
                            Our goal is to exceed your expectations and provide you with the best
                            shopping experience possible.
                        </p>
                    </div>
                    <section className="col-lg-4 col-md-12 mb-4">
                        <h5 className="text-uppercase">Help & Information</h5>
                        <Link className="btn btn-outline-primary m-1 d-block" to="/contact">
                            Contact
                        </Link>
                        <Link className="btn btn-outline-primary m-1 d-block" to="/privacy">
                            Privacy Policy
                        </Link>
                    </section>

                    <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Follow Us</h5>
                        <ul className="list-unstyled d-flex justify-content-center">
                            <li className="mx-2">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-facebook"></i>
                                </a>
                            </li>
                            <li className="mx-2">
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </li>
                            <li className="mx-2">
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-center p-3" style={{ backgroundColor: '#f1f1f1' }}>
                © {new Date().getFullYear()} ZENODO - All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
