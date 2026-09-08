import React, { useState } from 'react';
import Footer from '../components/Footer';
import { contactAPI } from '../services/api';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        countryCode: '+91',
        subject: 'General Inquiry',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await contactAPI.send(formData);
            setStatus({ type: 'success', message: response.data.message || 'Message sent successfully! We will reply within 24 hours.' });
            setFormData({ name: '', email: '', phone: '', countryCode: '+91', subject: 'General Inquiry', message: '' });
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to send message. Please try emailing us directly.';
            setStatus({ type: 'error', message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <main className="contact-page-section">
                <div className="container">
                    <header className="contact-header">
                        <h1>Get in Touch</h1>
                        <p>Have a question about our products? Want to collaborate? We'd love to hear from you. Our team replies within 24 hours.</p>
                    </header>

                    <div className="contact-layout">
                        <div className="contact-info">
                            <div className="method-item">
                                <strong>Email</strong>
                                <a href="mailto:hello@arvibaby.com">hello@arvibaby.com</a>
                            </div>
                            <div className="method-item">
                                <strong>Instagram</strong>
                                <a href="https://instagram.com/arvibaby" target="_blank" rel="noopener noreferrer">@arvibaby</a>
                            </div>
                            <div className="method-item">
                                <strong>Support Hours</strong>
                                <a>Mon-Fri, 9AM - 6PM IST</a>
                            </div>
                        </div>

                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Name *</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your full name" />
                                </div>
                                <div className="form-group">
                                    <label>Email *</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Phone</label>
                                    <div className="phone-input-group">
                                        <select name="countryCode" value={formData.countryCode} onChange={handleChange} className="country-select">
                                            <option value="+91">🇮🇳 +91</option>
                                            <option value="+1">🇺🇸 +1</option>
                                            <option value="+44">🇬🇧 +44</option>
                                            <option value="+61">🇦🇺 +61</option>
                                            <option value="+971">🇦🇪 +971</option>
                                        </select>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="98765 43210" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Subject</label>
                                    <select name="subject" value={formData.subject} onChange={handleChange}>
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Order Support">Order Support</option>
                                        <option value="Product Question">Product Question</option>
                                        <option value="Collaboration">Collaboration</option>
                                        <option value="Wholesale">Wholesale</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Message *</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" placeholder="Tell us how we can help you..."></textarea>
                            </div>

                            <button type="submit" className="btn-primary full-width" disabled={loading}>
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>

                            {status.message && (
                                <div className={status.type === 'success' ? 'success-message' : 'error-message'}>
                                    {status.message}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ContactPage;
