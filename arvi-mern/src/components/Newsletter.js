import React, { useState } from 'react';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setEmail('');
            setTimeout(() => setSubmitted(false), 3000);
        }
    };

    return (
        <section className="newsletter">
            <div className="container">
                <h2>Get launch updates</h2>
                <p>Sign up and we\'ll send a quick note when new products and early access become available.</p>
                <form className="newsletter-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn-primary">
                        Keep me posted
                    </button>
                </form>
                {submitted && <p style={{ marginTop: '20px', color: '#7cb342' }}>Thanks — we\'ll be in touch soon.</p>}
            </div>
        </section>
    );
};

export default Newsletter;
