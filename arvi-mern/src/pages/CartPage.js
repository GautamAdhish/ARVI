import React from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const CartPage = () => {
    return (
        <>
            <main className="cart-page-section">
                <div className="container">
                    <header className="cart-header">
                        <h1>Your Bag</h1>
                        <p>Items you've added to your collection.</p>
                    </header>
                    
                    <div className="cart-content">
                        <p>Your bag is currently empty.</p>
                        <Link to="/products" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px', textDecoration: 'none', borderRadius: '4px' }}>
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default CartPage;