import React from 'react';
import Footer from '../components/Footer';

const PrivacyPage = () => {
    return (
        <>
            <main className="static-page">
                <div className="container">
                    <h1>Privacy Policy</h1>
                    <p className="last-updated">Last updated: January 2026</p>

                    <section>
                        <h2>1. Information We Collect</h2>
                        <p>At ARVI, we collect information you provide directly, such as when you create an account, place an order, subscribe to our newsletter, or contact us. This includes name, email, phone, shipping address, and payment information.</p>
                    </section>

                    <section>
                        <h2>2. How We Use Your Information</h2>
                        <ul>
                            <li>To process and fulfill your orders</li>
                            <li>To communicate about your orders and our products</li>
                            <li>To improve our website and customer experience</li>
                            <li>To send newsletters (with your consent)</li>
                            <li>To prevent fraud and ensure security</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. Sharing Your Information</h2>
                        <p>We do not sell your personal information. We may share it with trusted service providers who help us operate our business (payment processors, shipping partners, email services) under strict confidentiality agreements.</p>
                    </section>

                    <section>
                        <h2>4. Data Security</h2>
                        <p>We implement industry-standard security measures to protect your data. All payment transactions are encrypted via SSL. Passwords are hashed and never stored in plain text.</p>
                    </section>

                    <section>
                        <h2>5. Your Rights</h2>
                        <p>You have the right to access, correct, or delete your personal data. You can update your profile in account settings or contact us at privacy@arvibaby.com. You can unsubscribe from marketing emails at any time.</p>
                    </section>

                    <section>
                        <h2>6. Cookies</h2>
                        <p>We use essential cookies to keep your cart and session active, and analytics cookies to understand how our site is used. You can disable non-essential cookies in your browser settings.</p>
                    </section>

                    <section>
                        <h2>7. Children's Privacy</h2>
                        <p>Our products are for children, but our website is intended for adults 18+. We do not knowingly collect information from children under 13.</p>
                    </section>

                    <section>
                        <h2>8. Contact Us</h2>
                        <p>Questions about this policy? Contact us at:</p>
                        <p>Email: hello@arvibaby.com<br />Address: ARVI Baby, 123 Parent Lane, Mumbai, India</p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default PrivacyPage;
