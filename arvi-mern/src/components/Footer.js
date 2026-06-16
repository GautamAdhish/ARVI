import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <Link to="/privacy" className="footer-link">Privacy Policy</Link>
                <Link to="/contact" className="footer-link">Contact</Link>
            </div>
            <p>Helping families make mealtimes a little easier. <br /> &copy; 2026 ARVI.</p>
        </footer>
    );
};

export default Footer;
