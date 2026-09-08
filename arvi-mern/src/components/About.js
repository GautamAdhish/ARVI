import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <section className="about" id="about">
            <div className="container">
                <div className="section-header">
                    <p className="products-page-kicker">Why ARVI Exists</p>
                    <h2>About ARVI</h2>
                    <p className="about-text">
                        We build simple, well-made pieces that help families feel a little more calm at the table. 
                        Our focus is on safety, durability, and designs that fit into everyday life. 
                        Born in Mumbai, loved by 10,000+ families across India.
                    </p>
                    <div style={{ marginTop: '24px' }}>
                        <Link to="/about" className="btn-primary outline">Read Our Story</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
