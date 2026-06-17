import React from 'react';
import Footer from '../components/Footer';

const AboutPage = () => {
    return (
        <>
            <main className="about-page">
                <div className="container">
                    <div className="about-story-content">
                        <span className="products-page-kicker">Our Journey</span>
                        <h1>Crafting Calm in the Chaos</h1>
                        
                        <p>
                            ARVI began in the mess of a Monday morning. Like many parents, we were navigating the transition to solids—a period filled with joy, but also with an overwhelming amount of bright, clunky plastic gear that felt out of place in our home and questionable for our children.
                        </p>
                        
                        <p>
                            We searched for pieces that were <span className="about-highlight">safe, durable, and beautiful</span>. When we couldn't find them, we decided to create them. We spent months researching food-grade silicone and ergonomic shapes, focusing on pieces that are as beautiful as they are functional.
                        </p>

                        <p>
                            At ARVI, we prioritize three things: Safety, Simplicity, and Style. Our designs are inspired by Scandinavian minimalism, using a palette that complements your home rather than competing with it. But most importantly, our products are built to foster independence, helping your little ones build confidence with every bite.
                        </p>

                        <p>
                            We aren’t just building tableware. We’re building the foundation for a lifetime of healthy, happy mealtimes. We’re honored to be a small part of your family’s story.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default AboutPage;