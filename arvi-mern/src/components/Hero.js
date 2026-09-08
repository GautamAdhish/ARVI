import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    const handleJoinWaitlist = () => {
        const newsletterSection = document.getElementById('newsletter');
        if (newsletterSection) {
            newsletterSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/#newsletter');
        }
    };

    const handleViewProducts = () => {
        navigate('/products');
    };

    return (
        <section className="hero">
            <div className="hero-image"></div>
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <div className="hero-badge">✨ New Collection 2026</div>
                <h1>Simpler mealtimes for little ones</h1>
                <p>Thoughtfully designed pieces that make feeding safer, cleaner, and easier for families. Food-grade silicone, stainless steel, and a lot of love.</p>
                <div className="button-group">
                    <button className="btn-primary" onClick={handleViewProducts}>
                        Shop Collection
                    </button>
                    <button className="btn-secondary" onClick={handleJoinWaitlist}>
                        Join Waitlist
                    </button>
                </div>
                <div className="hero-stats">
                    <div className="stat"><strong>10k+</strong> Happy Families</div>
                    <div className="stat"><strong>4.9★</strong> Average Rating</div>
                    <div className="stat"><strong>100%</strong> BPA Free</div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
