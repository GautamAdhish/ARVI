import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';

const CheckoutPage = () => {
    const { cart, total, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        email: user?.email || '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'India',
        paymentMethod: 'cod',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const subtotal = total;
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08;
    const finalTotal = subtotal + shipping + tax;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (cart.items.length === 0) {
            setError('Your cart is empty');
            setLoading(false);
            return;
        }

        if (!isAuthenticated) {
            // For guest checkout, still allow order creation via memory store logic
            // We'll simulate order creation locally if API fails
        }

        try {
            const orderData = {
                shippingAddress: {
                    fullName: formData.fullName,
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country,
                    phone: formData.phone,
                },
                paymentMethod: formData.paymentMethod,
                itemsPrice: subtotal,
                taxPrice: tax,
                shippingPrice: shipping,
                totalPrice: finalTotal,
            };

            const response = await orderAPI.create(orderData);
            
            await clearCart();
            navigate(`/orders?success=${response.data.data._id}`);
        } catch (err) {
            // If API not available, simulate success for demo
            if (err.message === 'Network Error' || !err.response) {
                const mockOrderId = 'ORD-' + Date.now().toString(36).toUpperCase();
                // Store in localStorage for orders page
                const existingOrders = JSON.parse(localStorage.getItem('arvi_guest_orders') || '[]');
                existingOrders.push({
                    _id: mockOrderId,
                    items: cart.items,
                    totalPrice: finalTotal,
                    status: 'pending',
                    createdAt: new Date().toISOString(),
                    shippingAddress: {
                        fullName: formData.fullName,
                        street: formData.street,
                        city: formData.city,
                    }
                });
                localStorage.setItem('arvi_guest_orders', JSON.stringify(existingOrders));
                await clearCart();
                navigate(`/orders?success=${mockOrderId}&guest=true`);
                return;
            }
            setError(err.response?.data?.message || 'Failed to create order');
        } finally {
            setLoading(false);
        }
    };

    if (cart.items.length === 0) {
        return (
            <>
                <main className="checkout-page empty">
                    <div className="container">
                        <h1>Checkout</h1>
                        <p>Your cart is empty. Add some products first.</p>
                        <button onClick={() => navigate('/products')} className="btn-primary">Shop Now</button>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <main className="checkout-page">
                <div className="container">
                    <h1>Checkout</h1>
                    
                    <div className="checkout-layout">
                        <div className="checkout-form-panel">
                            {error && <div className="error-message">{error}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="form-section">
                                    <h3>Contact Information</h3>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Full Name *</label>
                                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone *</label>
                                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 98765 43210" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="for order updates" />
                                    </div>
                                </div>

                                <div className="form-section">
                                    <h3>Shipping Address</h3>
                                    <div className="form-group">
                                        <label>Street Address *</label>
                                        <input type="text" name="street" value={formData.street} onChange={handleChange} required placeholder="House no, street, area" />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>City *</label>
                                            <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label>State *</label>
                                            <input type="text" name="state" value={formData.state} onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>ZIP Code *</label>
                                            <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label>Country</label>
                                            <select name="country" value={formData.country} onChange={handleChange}>
                                                <option value="India">India</option>
                                                <option value="USA">USA</option>
                                                <option value="UK">UK</option>
                                                <option value="Canada">Canada</option>
                                                <option value="Australia">Australia</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-section">
                                    <h3>Payment Method</h3>
                                    <div className="payment-options">
                                        <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                                            <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} />
                                            <div>
                                                <strong>Cash on Delivery</strong>
                                                <p>Pay when you receive your order</p>
                                            </div>
                                        </label>
                                        <label className={`payment-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                                            <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} />
                                            <div>
                                                <strong>Credit / Debit Card</strong>
                                                <p>Secure payment via Razorpay</p>
                                            </div>
                                        </label>
                                        <label className={`payment-option ${formData.paymentMethod === 'upi' ? 'selected' : ''}`}>
                                            <input type="radio" name="paymentMethod" value="upi" checked={formData.paymentMethod === 'upi'} onChange={handleChange} />
                                            <div>
                                                <strong>UPI</strong>
                                                <p>Google Pay, PhonePe, Paytm</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <button type="submit" className="btn-primary full-width large" disabled={loading}>
                                    {loading ? 'Placing Order...' : `Place Order • $${finalTotal.toFixed(2)}`}
                                </button>

                                <p className="checkout-terms">By placing your order, you agree to ARVI's privacy policy and terms of service.</p>
                            </form>
                        </div>

                        <div className="checkout-summary">
                            <h3>Order Summary</h3>
                            <div className="checkout-items">
                                {cart.items.map((item) => {
                                    const prod = item.product || {};
                                    return (
                                        <div key={item._id} className="checkout-item">
                                            <img src={prod.image || ''} alt={prod.name || ''} />
                                            <div>
                                                <p>{prod.name || 'Product'}</p>
                                                <small>Qty: {item.quantity}</small>
                                            </div>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="summary-totals">
                                <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                                <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
                                <div className="summary-row"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                                <div className="summary-row total"><span>Total</span><span>${finalTotal.toFixed(2)}</span></div>
                            </div>

                            {!isAuthenticated && (
                                <div className="guest-notice">
                                    <p>💡 <strong>Guest Checkout:</strong> Create an account after ordering to track your order easily.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default CheckoutPage;
