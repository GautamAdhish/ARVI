import React from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const CartPage = ({ cart, removeFromCart }) => {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <>
            <main className="cart-page-section">
                <div className="container">
                    <header className="cart-header">
                        <h1>Your Bag</h1>
                        <p>Items you've added to your collection.</p>
                    </header>
                    
                    <div className="cart-content">
                        {cart.length === 0 ? (
                            <>
                                <p>Your bag is currently empty.</p>
                                <Link to="/products" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px', textDecoration: 'none', borderRadius: '4px' }}>
                                    Continue Shopping
                                </Link>
                            </>
                        ) : (
                            <div className="cart-items">
                                {cart.map(item => (
                                    <div key={item.id} className="cart-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee' }}>
                                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                            <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                                            <div style={{ textAlign: 'left' }}>
                                                <h3 style={{ fontSize: '16px' }}>{item.name}</h3>
                                                <p style={{ fontSize: '14px', color: '#666' }}>Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => removeFromCart(item.id)}
                                            style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontWeight: '600' }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <div className="cart-summary" style={{ marginTop: '30px', textAlign: 'right' }}>
                                    <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
                                        Total: ${total.toFixed(2)}
                                    </p>
                                    <button className="btn-primary" style={{ width: '100%', borderRadius: '50px' }}>
                                        Checkout
                                    </button>
                                    <Link to="/products" style={{ display: 'block', marginTop: '15px', color: '#7a8b87', fontSize: '14px' }}>
                                        Add more items
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default CartPage;