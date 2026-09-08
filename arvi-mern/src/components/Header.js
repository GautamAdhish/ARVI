import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const closeMenu = () => setMenuOpen(false);

    const handleLogout = () => {
        logout();
        closeMenu();
        navigate('/');
    };

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
                        <NavLink to="/cart" className={({ isActive }) => isActive ? 'active' : undefined} onClick={closeMenu}>
                            Cart
                            {cartCount > 0 && (
                                <span className="cart-badge">{cartCount}</span>
                            )}
                        </NavLink>
                        <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : undefined} onClick={closeMenu}>Our Story</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : undefined} onClick={closeMenu}>Contact</NavLink>
                        
                        {isAuthenticated ? (
                            <>
                                <NavLink to="/orders" className={({ isActive }) => isActive ? 'active' : undefined} onClick={closeMenu}>Orders</NavLink>
                                {isAdmin && <NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : undefined} onClick={closeMenu}>Admin</NavLink>}
                                <div className="user-menu">
                                    <span className="user-name">Hi, {user?.name?.split(' ')[0]}</span>
                                    <button onClick={handleLogout} className="btn-logout">Logout</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : undefined} onClick={closeMenu}>Login</NavLink>
                                <Link to="/register" className="btn-register" onClick={closeMenu}>Sign Up</Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
