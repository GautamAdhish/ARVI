import React from 'react';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
    const { cart, total, cartCount, updateQuantity, removeFromCart, clearCart, loading } = useCart();
    const navigate = useNavigate();

    const handleQuantityChange = async (itemId, newQty) => {
        if (newQty < 1) return;
        await updateQuantity(itemId, newQty);
    };

    const subtotal = total;
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08;
    const finalTotal = subtotal + shipping + tax;

    return (
        <>
            <main className="cart-page-section">
                <div className="container">
                    <header className="cart-header">
                        <h1>Your Bag</h1>
                        <p>{cartCount === 0 ? 'Your bag is empty' : `${cartCount} ${cartCount === 1 ? 'item' : 'items'} in your collection`}</p>
                    </header>
                    
                    <div className="cart-layout">
                        {cart.items.length === 0 ? (
                            <div className="cart-content empty">
                                <div className="empty-icon">🛒</div>
                                <h3>Your bag is currently empty.</h3>
                                <p>Looks like you haven't added anything yet. Let's find something your little one will love.</p>
                                <Link to="/products" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px', textDecoration: 'none', borderRadius: '50px' }}>
                                    Continue Shopping
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="cart-items-panel">
                                    {cart.items.map(item => {
                                        const prod = item.product || {};
                                        const itemId = item._id;
                                        const prodImage = prod.image || prod.images?.[0] || item.image || '';
                                        const prodName = prod.name || item.name || 'Product';
                                        const price = item.price;

                                        return (
                                            <div key={itemId} className="cart-item">
                                                <div className="cart-item-image">
                                                    <img src={prodImage} alt={prodName} />
                                                </div>
                                                <div className="cart-item-details">
                                                    <h3>{prodName}</h3>
                                                    <p className="cart-item-subtitle">{prod.subtitle || ''}</p>
                                                    <p className="cart-item-price">${price.toFixed(2)} each</p>
                                                    
                                                    <div className="cart-item-actions">
                                                        <div className="qty-controls">
                                                            <button onClick={() => handleQuantityChange(itemId, item.quantity - 1)} disabled={item.quantity <= 1 || loading}>-</button>
                                                            <span>{item.quantity}</span>
                                                            <button onClick={() => handleQuantityChange(itemId, item.quantity + 1)} disabled={loading}>+</button>
                                                        </div>
                                                        <button onClick={() => removeFromCart(itemId)} className="remove-btn" disabled={loading}>
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="cart-item-total">
                                                    ${(price * item.quantity).toFixed(2)}
                                                </div>
                                            </div>
                                        );
                                    })}

                                    <div className="cart-bottom-actions">
                                        <button onClick={() => clearCart()} className="btn-text">Clear Cart</button>
                                        <Link to="/products">← Continue Shopping</Link>
                                    </div>
                                </div>

                                <div className="cart-summary-panel">
                                    <h3>Order Summary</h3>
                                    <div className="summary-row">
                                        <span>Subtotal ({cartCount} items)</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Shipping</span>
                                        <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    {subtotal > 0 && subtotal < 50 && (
                                        <div className="free-shipping-notice">
                                            Add ${(50 - subtotal).toFixed(2)} more for FREE shipping! 🚚
                                        </div>
                                    )}
                                    <div className="summary-row total">
                                        <span>Total</span>
                                        <span>${finalTotal.toFixed(2)}</span>
                                    </div>

                                    <button onClick={() => navigate('/checkout')} className="btn-primary checkout-btn">
                                        Proceed to Checkout
                                    </button>

                                    <div className="payment-icons">
                                        <span>🔒 Secure checkout</span>
                                        <span>💳 Card • UPI • COD</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default CartPage;
