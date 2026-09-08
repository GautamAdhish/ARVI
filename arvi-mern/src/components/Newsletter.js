import React, { useState } from 'react';
import { newsletterAPI } from '../services/api';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await newsletterAPI.subscribe(email);
            setStatus({ type: 'success', message: response.data.message || 'Successfully subscribed! 🎉' });
            setEmail('');
        } catch (error) {
            const message = error.response?.data?.message || 'Something went wrong. Please try again.';
            setStatus({ type: 'error', message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="newsletter" id="newsletter">
            <div className="container">
                <div className="newsletter-card">
                    <h2>Join our family</h2>
                    <p>Get early access to new colours, parenting tips, and 10% off your first order.</p>
                    <form className="newsletter-form" onSubmit={handleSubmit}>
                        <input 
                            type="email" 
                            placeholder="Your email address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Joining...' : 'Join'}
                        </button>
                    </form>
                    {status.message && (
                        <div className={`${status.type}-message`} style={{ marginTop: '16px' }}>
                            {status.message}
                        </div>
                    )}
                    <p className="newsletter-privacy">No spam, unsubscribe anytime. Read our <a href="/privacy">Privacy Policy</a></p>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
