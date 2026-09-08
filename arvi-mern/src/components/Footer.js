import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="footer-grid">
                <div className="footer-brand">
                    <h3>ARVI</h3>
                    <p>Modern feeding essentials for little ones. Safe, sustainable, and designed for real family life. Made with love in Mumbai.</p>
                    <p style={{ marginTop: '16px', fontSize: '12px', opacity: 0.5 }}>© 2026 ARVI Baby. All rights reserved.<br/>Crafted for calmer mealtimes.</p>
                </div>
                <div className="footer-col">
                    <h4>Shop</h4>
                    <Link to="/products">All Products</Link>
                    <Link to="/products?category=bowls">Bowls</Link>
                    <Link to="/products?category=sets">Sets</Link>
                    <Link to="/products?category=accessories">Cups & More</Link>
                </div>
                <div className="footer-col">
                    <h4>Company</h4>
                    <Link to="/about">Our Story</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                    <a href="mailto:hello@arvibaby.com">hello@arvibaby.com</a>
                </div>
                <div className="footer-col">
                    <h4>Support</h4>
                    <Link to="/orders">Track Order</Link>
                    <Link to="/contact">Shipping & Returns</Link>
                    <Link to="/contact">FAQs</Link>
                    <a href="https://instagram.com/arvibaby" target="_blank" rel="noopener noreferrer">Instagram @arvibaby</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
