import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const ProductsPage = ({ products }) => {
    return (
        <>
            <main className="products-page">
                <section className="products-page-hero">
                    <div className="container">
                        <p className="products-page-kicker">ARVI Collection</p>
                        <h1>Shop the Range</h1>
                        <p className="products-page-intro">
                            Thoughtfully designed feeding essentials for your home.
                        </p>
                    </div>
                </section>

                <section className="products-page-grid-section">
                    <div className="container">
                        <div className="products-page-grid">
                            {products.map((product) => (
                                <Link to={`/products/${product.id}`} key={product.id} className="product-link-wrapper">
                                    <article className="product-page-card">
                                        <div 
                                            className="product-page-image"
                                            style={{ backgroundImage: product.image ? `url('${product.image}')` : 'none' }}
                                        >
                                            {!product.image && 'ARVI'}
                                        </div>
                                        <div className="product-page-content">
                                            <p className="product-page-subtitle">{product.subtitle}</p>
                                            <h2>{product.name}</h2>
                                            <p>{product.description}</p>
                                            <p className="product-page-price" style={{ marginTop: '12px', fontWeight: '600', color: '#2f4a4d' }}>${product.price.toFixed(2)}</p>
                                            <p className="product-page-stock" style={{ fontSize: '12px', color: '#7a8b87' }}>{product.stock} in stock</p>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default ProductsPage;