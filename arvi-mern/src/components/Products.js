import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const Products = () => {
    const { featured, loading } = useProducts();

    if (loading) {
        return (
            <section className="products" id="products">
                <div className="container">
                    <h2>Our Collection</h2>
                    <div className="product-grid">
                        {[1,2].map(i => (
                            <div key={i} className="product-card skeleton">
                                <div className="product-image skeleton-box"></div>
                                <div className="skeleton-line"></div>
                                <div className="skeleton-line short"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    const displayProducts = featured.length > 0 ? featured.slice(0,2) : [];

    return (
        <section className="products" id="products">
            <div className="container">
                <div className="section-header">
                    <h2>Our Collection</h2>
                    <p className="section-subtitle">Thoughtfully designed for everyday moments</p>
                </div>
                <div className="product-grid">
                    {displayProducts.map((product) => (
                        <Link key={product._id} to={`/products/${product._id}`} className="product-link-wrapper">
                            <div className="product-card">
                                <div 
                                    className="product-image"
                                    style={{ backgroundImage: `url('${product.image}')` }}
                                >
                                    {product.comparePrice > product.price && (
                                        <span className="sale-badge">Save ${(product.comparePrice - product.price).toFixed(0)}</span>
                                    )}
                                </div>
                                <div className="product-card-content">
                                    <p className="product-subtitle">{product.subtitle}</p>
                                    <h3>{product.name}</h3>
                                    <p>{product.shortDescription || product.description.substring(0, 80)}...</p>
                                    <div className="product-card-footer">
                                        <span className="product-price">${product.price.toFixed(2)}</span>
                                        <span className="product-stock">{product.stock} in stock • {product.rating}★</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="text-center mt-40">
                    <Link to="/products" className="btn-primary outline">View All Products</Link>
                </div>
            </div>
        </section>
    );
};

export default Products;
