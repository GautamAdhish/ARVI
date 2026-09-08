import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const successId = searchParams.get('success');
    const isGuest = searchParams.get('guest');
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                if (isAuthenticated) {
                    const response = await orderAPI.getMyOrders();
                    setOrders(response.data.data);
                } else {
                    // Guest orders from localStorage
                    const guestOrders = JSON.parse(localStorage.getItem('arvi_guest_orders') || '[]');
                    setOrders(guestOrders);
                }
            } catch (error) {
                console.warn('Failed to fetch orders, checking guest storage', error);
                const guestOrders = JSON.parse(localStorage.getItem('arvi_guest_orders') || '[]');
                setOrders(guestOrders);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [isAuthenticated]);

    if (loading) {
        return (
            <>
                <main className="orders-page">
                    <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
                        <div className="spinner"></div>
                        <p>Loading your orders...</p>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <main className="orders-page">
                <div className="container">
                    {successId && (
                        <div className="success-banner">
                            <h2>🎉 Order Placed Successfully!</h2>
                            <p>Your order ID is <strong>{successId}</strong></p>
                            <p>We've sent a confirmation to your email. {isGuest ? 'Save this ID to track your order.' : 'You can track it below.'}</p>
                        </div>
                    )}

                    <header className="orders-header">
                        <h1>{isAuthenticated ? 'My Orders' : 'Order History'}</h1>
                        <p>{orders.length === 0 ? 'No orders yet' : `${orders.length} ${orders.length === 1 ? 'order' : 'orders'} found`}</p>
                    </header>

                    {orders.length === 0 ? (
                        <div className="empty-orders">
                            <div className="empty-icon">📦</div>
                            <h3>No orders yet</h3>
                            <p>When you place an order, it will appear here.</p>
                            <Link to="/products" className="btn-primary">Start Shopping</Link>
                        </div>
                    ) : (
                        <div className="orders-list">
                            {orders.map((order) => (
                                <div key={order._id} className="order-card">
                                    <div className="order-header">
                                        <div>
                                            <h3>Order #{order._id.slice(-8).toUpperCase()}</h3>
                                            <p>{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        </div>
                                        <div className="order-status-wrapper">
                                            <span className={`status-badge ${order.status}`}>{order.status}</span>
                                            <strong>${(order.totalPrice || 0).toFixed(2)}</strong>
                                        </div>
                                    </div>

                                    <div className="order-items">
                                        {order.items?.map((item, idx) => (
                                            <div key={idx} className="order-item">
                                                <img src={item.image || ''} alt={item.name} />
                                                <div>
                                                    <p>{item.name}</p>
                                                    <small>Qty: {item.quantity} × ${item.price?.toFixed(2)}</small>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="order-footer">
                                        <div>
                                            <p><strong>Shipping to:</strong> {order.shippingAddress?.fullName || order.shippingAddress?.street || 'Address on file'}</p>
                                            <p><small>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}</small></p>
                                        </div>
                                        <div className="order-actions">
                                            <span className="payment-method">{order.paymentMethod?.toUpperCase()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default OrdersPage;
