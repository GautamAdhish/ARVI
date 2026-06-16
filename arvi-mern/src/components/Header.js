import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header>
            <div className="container">
                <div className="header-content">
                    <Link to="/" className="logo">ARVI</Link>
                    <button
                        type="button"
                        className="menu-toggle"
                        aria-label="Open menu"
                        aria-expanded={menuOpen}
                        aria-controls="primary-navigation"
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                    <div className={`nav-backdrop ${menuOpen ? 'open' : ''}`} onClick={closeMenu} />
                    <nav id="primary-navigation" className={menuOpen ? 'open' : ''}>
                        <Link to="/" onClick={closeMenu}>Home</Link>
                        <Link to="/products" onClick={closeMenu}>Shop</Link>
                        <Link to="/products" onClick={closeMenu}>Journal</Link>
                        <a href="#about" onClick={closeMenu}>Our Story</a>
                        <Link to="/contact" onClick={closeMenu}>Contact</Link> {/* Updated to use Link for the dedicated ContactPage */}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
