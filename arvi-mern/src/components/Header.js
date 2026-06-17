import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

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
                        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : undefined} onClick={closeMenu}>Home</NavLink>
                        <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : undefined} onClick={closeMenu}>Shop</NavLink>
                        <a href="#about" onClick={closeMenu}>Our Story</a>
                        {/* <NavLink to="/journal" className={({ isActive }) => isActive ? 'active' : undefined} onClick={closeMenu}>Journal</NavLink> */}
                        <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : undefined} onClick={closeMenu}>Contact</NavLink>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
