import React from 'react';

const Contact = () => {
    return (
        <section className="contact" id="contact">
            <div className="container">
                <h2>Get in touch</h2>
                <div className="contact-links">
                    <a href="mailto:hello@arvibaby.com" className="contact-link">Email: hello@arvibaby.com</a>
                    <a href="https://instagram.com/arvibaby" className="contact-link" target="_blank" rel="noopener noreferrer">Instagram: @arvibaby</a>
                    <a href="https://wa.me/1234567890" className="contact-link" target="_blank" rel="noopener noreferrer">WhatsApp us</a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
