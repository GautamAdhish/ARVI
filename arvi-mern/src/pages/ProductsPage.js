import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useProducts } from '../context/ProductContext';

const ProductsPage = () => {
    const { products, loading, fetchProducts } = useProducts();
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('-createdAt');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchProducts({ category: filter, sort, search: search || undefined });
    }, [filter, sort]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProducts({ category: filter, sort, search: search || undefined });
    };

    return (
        <>
            <main className="products-page">
                <section className="products-page-hero">
                    <div className="container">
                        <p className="products-page-kicker">ARVI Collection • {products.length} Products</p>
                        <h1>Shop the Range</h1>
                        <p className="products-page-intro">
                            Thoughtfully designed feeding essentials for your home. Safe, sustainable, and made for real life.
                        </p>

                        <div className="products-controls">
                            <form onSubmit={handleSearch} className="search-bar">
                                <input 
                                    type="text" 
                                    placeholder="Search bowls, plates, cups..." 
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button type="submit">Search</button>
                            </form>

                            <div className="filter-sort">
                                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                                    <option value="all">All Categories</option>
                                    <option value="bowls">Bowls</option>
                                    <option value="plates">Plates</option>
                                    <option value="sets">Sets</option>
                                    <option value="accessories">Accessories</option>
                                </select>
                                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                                    <option value="-createdAt">Newest</option>
                                    <option value="price">Price: Low to High</option>
                                    <option value="-price">Price: High to Low</option>
                                    <option value="rating">Highest Rated</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="products-page-grid-section">
                    <div className="container">
                        {loading ? (
                            <div className="products-page-grid">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="product-page-card skeleton">
                                        <div className="product-page-image skeleton-box"></div>
                                        <div className="product-page-content">
                                            <div className="skeleton-line"></div>
                                            <div className="skeleton-line short"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : products.length === 0 ? (
                            <div className="empty-state">
                                <h3>No products found</h3>
                                <p>Try adjusting your filters or search.</p>
                                <button onClick={() => { setFilter('all'); setSearch(''); fetchProducts({}); }} className="btn-primary">Clear Filters</button>
                            </div>
                        ) : (
                            <div className="products-page-grid">
                                {products.map((product) => (
                                    <Link to={`/products/${product._id}`} key={product._id} className="product-link-wrapper">
                                        <article className="product-page-card">
                                            <div 
                                                className="product-page-image"
                                                style={{ backgroundImage: product.image ? `url('${product.image}')` : 'none' }}
                                            >
                                                {!product.image && 'ARVI'}
                                                {product.comparePrice > product.price && (
                                                    <span className="sale-badge">Sale</span>
                                                )}
                                                {product.stock < 10 && product.stock > 0 && (
                                                    <span className="low-stock-badge">Low Stock</span>
                                                )}
                                                {product.stock === 0 && (
                                                    <span className="out-stock-badge">Out of Stock</span>
                                                )}
                                            </div>
                                            <div className="product-page-content">
                                                <p className="product-page-subtitle">{product.subtitle}</p>
                                                <h2>{product.name}</h2>
                                                <p>{product.shortDescription || product.description.substring(0, 100)}...</p>
                                                <div className="product-page-footer">
                                                    <div>
                                                        <span className="product-page-price">${product.price.toFixed(2)}</span>
                                                        {product.comparePrice > product.price && (
                                                            <span className="compare-price">${product.comparePrice.toFixed(2)}</span>
                                                        )}
                                                    </div>
                                                    <div className="product-meta">
                                                        <span className="rating">★ {product.rating}</span>
                                                        <span className="stock">{product.stock} in stock</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default ProductsPage;
