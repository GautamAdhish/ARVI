import React from 'react';
import Footer from '../components/Footer';

const AboutPage = () => {
    return (
        <>
            <main className="about-page">
                <div className="container">
                    <div className="about-story-content">
                        <p className="products-page-kicker">Our Story</p>
                        <h1>Built by parents, for parents</h1>
                        <p>
                            ARVI started in a small Mumbai kitchen, where two first-time parents were struggling with mealtimes. 
                            Bowls that tipped over, plates that didn't stay put, cutlery that was too hard for tiny hands to hold.
                        </p>
                        <p>
                            We wondered — why does feeding have to be so stressful? So we started designing. We talked to pediatricians, 
                            tested materials, watched hundreds of toddlers eat (and throw food). We obsessed over the perfect curve, 
                            the right weight, the softest silicone that still stays put.
                        </p>
                        <p>
                            <span className="about-highlight">Safety first, always.</span> Every ARVI product is made with 100% food-grade silicone and 304 stainless steel. 
                            No BPA, no PVC, no phthalates. Just materials you can trust, tested to international standards.
                        </p>
                        <p>
                            Today, over 10,000 families across India use ARVI to make mealtimes calmer. We're not trying to be perfect — 
                            just a little bit better, one meal at a time.
                        </p>

                        <div className="about-values">
                            <div className="value"><h3>🌱 Sustainable</h3><p>Designed to last for years, not months. Less waste, more use.</p></div>
                            <div className="value"><h3>🛡️ Safe</h3><p>Food-grade, lab-tested, and certified safe for babies 6M+</p></div>
                            <div className="value"><h3>❤️ Thoughtful</h3><p>Every detail considered — from suction strength to grip size</p></div>
                        </div>

                        <div className="about-cta">
                            <h2>Join our family</h2>
                            <p>Be part of a community of parents making mealtimes easier.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default AboutPage;
