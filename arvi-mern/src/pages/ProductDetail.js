import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../components/Footer';

const ProductDetail = ({ products, addToCart }) => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);

    const product = products.find(p => p.id === parseInt(id));

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10) || 1;
        setQuantity(Math.min(product?.stock || 1, Math.max(1, value)));
    };

    const incrementQuantity = () => {
        if (product && quantity < product.stock) {
            setQuantity(prev => prev + 1);
        }
    };

    const decrementQuantity = () => {
        setQuantity(prev => Math.max(1, prev - 1)); // Ensure quantity doesn't go below 1
    };

    const handleAddToCartClick = () => {
        if (product && addToCart(product.id, quantity)) {
            alert(`${quantity} of ${product.name} added to cart!`);
            setQuantity(1);
        }
    };

    if (!product) {
        return <div className="container"><h2>Product not found</h2><Link to="/products">Back to Shop</Link></div>;
    }

    return (
        <>
            <main className="product-detail-page">
                <div className="container">
                    <nav className="breadcrumb">
                        <Link to="/">Home</Link> / <Link to="/products">Shop</Link> / {product.name}
                    </nav>

                    <div className="product-detail-grid">
                        <div className="product-detail-gallery">
                            <img src={product.image} alt={product.name} className="main-product-image" />
                        </div>

                        <div className="product-detail-info">
                            <p className="detail-subtitle">{product.subtitle}</p>
                            <h1 className="detail-title">{product.name}</h1>
                            <p className="detail-price">${product.price.toFixed(2)}</p>
                            <p className="detail-stock">In Stock: {product.stock}</p>
                            
                            <div className="detail-description">
                                <p>{product.description}</p>
                            </div>

                            <div className="detail-specs">
                                <h3>Key Features</h3>
                                <ul>
                                    {product.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="purchase-actions">
                                <div className="quantity-selector">
                                    <span>Qty</span>
                                    <button onClick={decrementQuantity} className="quantity-btn minus">-</button>
                                    <input type="number" 
                                           value={quantity} 
                                           onChange={handleQuantityChange} 
                                           min="1" max={product.stock} className="quantity-input" />
                                    <button onClick={incrementQuantity} className="quantity-btn plus">+</button>
                                </div>
                                <button className="btn-secondary">Buy now</button>
                                <button onClick={handleAddToCartClick} className="btn-primary add-to-cart" disabled={product.stock === 0}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ProductDetail;