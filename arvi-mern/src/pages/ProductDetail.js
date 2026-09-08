import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { productAPI } from '../services/api';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getProductById } = useProducts();
    const { addToCart, loading: cartLoading } = useCart();
    const { isAuthenticated } = useAuth();
    
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [added, setAdded] = useState(false);
    const [review, setReview] = useState({ rating: 5, comment: '' });
    const [reviewLoading, setReviewLoading] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            const data = await getProductById(id);
            setProduct(data);
            setLoading(false);
        };
        loadProduct();
    }, [id, getProductById]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10) || 1;
        setQuantity(Math.min(product?.stock || 99, Math.max(1, value)));
    };

    const incrementQuantity = () => {
        if (product && quantity < product.stock) {
            setQuantity(prev => prev + 1);
        }
    };

    const decrementQuantity = () => {
        setQuantity(prev => Math.max(1, prev - 1));
    };

    const handleAddToCart = async () => {
        if (!product) return;
        const result = await addToCart(product, quantity);
        if (result.success) {
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        } else {
            alert(result.message || 'Failed to add to cart');
        }
    };

    const handleBuyNow = async () => {
        await handleAddToCart();
        navigate('/cart');
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        if (!review.comment.trim()) {
            alert('Please add a comment');
            return;
        }

        setReviewLoading(true);
        try {
            await productAPI.addReview(product._id, review);
            alert('Review added successfully!');
            const updated = await getProductById(id);
            setProduct(updated);
            setReview({ rating: 5, comment: '' });
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to add review');
        } finally {
            setReviewLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
                <div className="spinner"></div>
                <p>Loading product...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
                <h2>Product not found</h2>
                <Link to="/products" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px' }}>Back to Shop</Link>
            </div>
        );
    }

    const images = product.images && product.images.length > 0 ? product.images : [product.image];

    return (
        <>
            <main className="product-detail-page">
                <div className="container">
                    <nav className="breadcrumb">
                        <Link to="/">Home</Link> / <Link to="/products">Shop</Link> / {product.name}
                    </nav>

                    <div className="product-detail-grid">
                        <div className="product-detail-gallery">
                            <div className="main-image-wrapper">
                                <img src={images[activeImage]} alt={product.name} className="main-product-image" />
                                {product.comparePrice > product.price && (
                                    <span className="sale-badge large">Save ${(product.comparePrice - product.price).toFixed(2)}</span>
                                )}
                            </div>
                            {images.length > 1 && (
                                <div className="thumbnail-row">
                                    {images.map((img, idx) => (
                                        <button 
                                            key={idx} 
                                            className={`thumb ${activeImage === idx ? 'active' : ''}`}
                                            onClick={() => setActiveImage(idx)}
                                        >
                                            <img src={img} alt={`${product.name} ${idx+1}`} />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="product-detail-info">
                            <p className="detail-subtitle">{product.subtitle}</p>
                            <h1 className="detail-title">{product.name}</h1>
                            
                            <div className="detail-meta">
                                <span className="rating">★ {product.rating} ({product.numReviews || product.reviews?.length || 0} reviews)</span>
                                <span className={`stock-badge ${product.stock === 0 ? 'out' : product.stock < 10 ? 'low' : 'in'}`}>
                                    {product.stock === 0 ? 'Out of Stock' : product.stock < 10 ? `Only ${product.stock} left` : `In Stock: ${product.stock}`}
                                </span>
                            </div>

                            <div className="detail-price-row">
                                <p className="detail-price">${product.price.toFixed(2)}</p>
                                {product.comparePrice > product.price && (
                                    <p className="compare-price">${product.comparePrice.toFixed(2)}</p>
                                )}
                            </div>
                            
                            <div className="detail-description">
                                <p>{product.description}</p>
                            </div>

                            {product.materials && (
                                <div className="detail-materials">
                                    <h4>Materials</h4>
                                    <div className="tag-row">
                                        {product.materials.map((m, i) => <span key={i} className="tag">{m}</span>)}
                                    </div>
                                </div>
                            )}

                            <div className="detail-specs">
                                <h3>Key Features</h3>
                                <ul>
                                    {product.features?.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>

                            {product.careInstructions && (
                                <div className="detail-care">
                                    <h4>Care Instructions</h4>
                                    <p>{product.careInstructions.join(' • ')}</p>
                                </div>
                            )}

                            <div className="purchase-actions">
                                <div className="quantity-selector">
                                    <span>Qty</span>
                                    <button onClick={decrementQuantity} className="quantity-btn minus" disabled={quantity <= 1}>-</button>
                                    <input type="number" value={quantity} onChange={handleQuantityChange} min="1" max={product.stock} className="quantity-input" />
                                    <button onClick={incrementQuantity} className="quantity-btn plus" disabled={quantity >= product.stock}>+</button>
                                </div>
                                <button onClick={handleBuyNow} className="btn-secondary" disabled={product.stock === 0}>Buy now</button>
                                <button onClick={handleAddToCart} className={`btn-primary add-to-cart ${added ? 'added' : ''}`} disabled={product.stock === 0 || cartLoading}>
                                    {added ? '✓ Added!' : cartLoading ? 'Adding...' : 'Add to Cart'}
                                </button>
                            </div>

                            <div className="trust-badges">
                                <span>🚚 Free shipping over $50</span>
                                <span>↩️ 30-day returns</span>
                                <span>🔒 Secure checkout</span>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="reviews-section">
                        <h2>Customer Reviews</h2>
                        <div className="reviews-grid">
                            <div className="review-form-card">
                                <h3>Write a review</h3>
                                {!isAuthenticated ? (
                                    <p>Please <Link to="/login">login</Link> to write a review.</p>
                                ) : (
                                    <form onSubmit={handleReviewSubmit}>
                                        <div className="form-group">
                                            <label>Rating</label>
                                            <select value={review.rating} onChange={(e) => setReview({...review, rating: Number(e.target.value)})}>
                                                <option value={5}>★★★★★ (5)</option>
                                                <option value={4}>★★★★☆ (4)</option>
                                                <option value={3}>★★★☆☆ (3)</option>
                                                <option value={2}>★★☆☆☆ (2)</option>
                                                <option value={1}>★☆☆☆☆ (1)</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Your review</label>
                                            <textarea 
                                                value={review.comment} 
                                                onChange={(e) => setReview({...review, comment: e.target.value})}
                                                placeholder="Share your experience..."
                                                rows="4"
                                                required
                                            ></textarea>
                                        </div>
                                        <button type="submit" className="btn-primary" disabled={reviewLoading}>
                                            {reviewLoading ? 'Submitting...' : 'Submit Review'}
                                        </button>
                                    </form>
                                )}
                            </div>

                            <div className="reviews-list">
                                {product.reviews && product.reviews.length > 0 ? (
                                    product.reviews.map((r, idx) => (
                                        <div key={idx} className="review-card">
                                            <div className="review-header">
                                                <strong>{r.name}</strong>
                                                <span className="review-rating">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</span>
                                            </div>
                                            <p>{r.comment}</p>
                                            <small>{new Date(r.createdAt).toLocaleDateString()}</small>
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-reviews">No reviews yet. Be the first to review!</p>
                                )}
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
