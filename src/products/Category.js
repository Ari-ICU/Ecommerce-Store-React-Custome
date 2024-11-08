import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const CategoryPage = ({ addToWishlist, addToCart, wishlist, cart }) => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [sortField, setSortField] = useState('price');  // Field to sort by ('price' or 'title')
    const [sortOrder, setSortOrder] = useState('asc');    // Sorting order ('asc' or 'desc')

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchCategoryProducts();
    }, [category]);

    // Sort the products based on the selected field and order
    const sortedProducts = products.sort((a, b) => {
        if (sortField === 'price') {
            return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        } else if (sortField === 'title') {
            return sortOrder === 'asc'
                ? a.title.localeCompare(b.title)
                : b.title.localeCompare(a.title);
        }
        return 0;
    });

    // Handle sorting change
    const handleSortChange = (event) => {
        const [field, order] = event.target.value.split('_');  // Example: "price_asc"
        setSortField(field);
        setSortOrder(order);
    };

    return (
        <div className="container-md my-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <h2 className="text-center mt-5 hover-underline">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                {/* Sort Controls as Dropdown */}
                <select
                    className="form-select w-auto"
                    onChange={handleSortChange}
                    value={`${sortField}_${sortOrder}`}  // To reflect current sorting state
                >
                    <option value="price_asc">Sort by Price: Low to High</option>
                    <option value="price_desc">Sort by Price: High to Low</option>
                    <option value="title_asc">Sort by Title: A to Z</option>
                    <option value="title_desc">Sort by Title: Z to A</option>
                </select>
            </div>
            <div className="row">
                {products.map((product) => (
                    <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card h-100">
                            <img
                                src={product.image}
                                className="card-img-top"
                                alt={product.title}
                                style={{ height: '250px', objectFit: 'contain' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">{product.description.slice(0, 100)}...</p>
                                <p className="text-muted">${product.price}</p>
                                <Link to={`/product/${product.id}`} className="btn btn-primary mb-2 me-2">
                                    View Details
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
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;
