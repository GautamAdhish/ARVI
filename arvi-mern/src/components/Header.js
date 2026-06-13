import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="header-content">
                    <Link to="/" className="logo">ARVI</Link>
                    <nav>
                        <Link to="/products">Shop</Link>
                        <Link to="/products">Journal</Link>
                        <a href="#about">Our Story</a>
                        <a href="#contact">Contact</a>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
