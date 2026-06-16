import React, { useState } from 'react';
import Footer from '../components/Footer';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        countryCode: '+44',
        phone: '',
        subject: '',
        message: ''
    });
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', or null
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus(null); // Reset status on new submission attempt

        // Basic validation
        if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
            setSubmissionStatus('error');
            return;
        }

        // In a real application, you would send this data to a backend server.
        // For this example, we'll just simulate a successful submission.
        console.log('Form submitted:', formData);
        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSubmissionStatus('success');
            setFormData({ name: '', email: '', countryCode: '+44', phone: '', subject: '', message: '' }); // Clear form
        } catch (error) {
            console.error('Submission error:', error);
            setSubmissionStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <section className="contact-page-section">
                <div className="container">
                    <header className="contact-header">
                        <h1>Get in touch</h1>
                        <p>Have a question or just want to say hello? We'd love to hear from you.</p>
                    </header>
                    
                    <div className="contact-layout">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <div className="phone-input-group">
                                    <select 
                                        name="countryCode" 
                                        value={formData.countryCode} 
                                        onChange={handleChange} 
                                        className="country-select"
                                        aria-label="Country code"
                                    >
                                        <option value="+44">UK (+44)</option>
                                        <option value="+1">US (+1)</option>
                                        <option value="+61">AU (+61)</option>
                                        <option value="+91">IN (+91)</option>
                                        <option value="+33">FR (+33)</option>
                                        <option value="+49">DE (+49)</option>
                                    </select>
                                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="7123 456789" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help?" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} placeholder="Tell us more..." required></textarea>
                            </div>
                            <button type="submit" className="btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                            {submissionStatus === 'success' && <p className="success-message">Your message has been sent successfully!</p>}
                            {submissionStatus === 'error' && <p className="error-message">There was an error sending your message. Please try again.</p>}
                        </form>

                        <aside className="contact-info">
                            <div className="method-item">
                                <strong>Email</strong>
                                <a href="mailto:hello@arvibaby.com">hello@arvibaby.com</a>
                            </div>
                            <div className="method-item">
                                <strong>Instagram</strong>
                                <a href="https://instagram.com/arvibaby" target="_blank" rel="noopener noreferrer">@arvibaby</a>
                            </div>
                            <div className="method-item">
                                <strong>WhatsApp</strong>
                                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">Message us</a>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ContactPage;