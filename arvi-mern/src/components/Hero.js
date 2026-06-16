import React from 'react';

const Hero = () => {
    const handleJoinWaitlist = () => {
        alert('Thanks — we\'ll keep you posted about launch updates.');
    };

    const handleViewProducts = () => {
        window.open('/products', '_blank');
    };

    return (
        <section className="hero">
            <div className="hero-image"></div>
            <div className="hero-content">
                <h1>Simpler mealtimes for little ones</h1>
                <p>Thoughtfully designed pieces that make feeding safer, cleaner, and easier for families.</p>
                <div className="button-group">
                    <button className="btn-primary" onClick={handleJoinWaitlist}>
                        Join the waitlist
                    </button>
                    <button className="btn-secondary" onClick={handleViewProducts}>
                        Browse the collection
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
