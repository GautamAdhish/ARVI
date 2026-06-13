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
                        <Link to="/products" onClick={closeMenu}>Shop</Link>
                        <Link to="/products" onClick={closeMenu}>Journal</Link>
                        <a href="#about" onClick={closeMenu}>Our Story</a>
                        <a href="#contact" onClick={closeMenu}>Contact</a>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
