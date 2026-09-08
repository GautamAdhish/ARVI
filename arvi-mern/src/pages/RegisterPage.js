import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        const result = await register(formData.name, formData.email, formData.password);
        
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <>
            <main className="auth-page">
                <div className="container">
                    <div className="auth-card">
                        <div className="auth-header">
                            <h1>Join ARVI</h1>
                            <p>Create an account for faster checkout and order tracking</p>
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input 
                                    type="password" 
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-primary full-width" disabled={loading}>
                                {loading ? 'Creating account...' : 'Create Account'}
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>Already have an account? <Link to="/login">Sign in</Link></p>
                            <p className="terms">By creating an account, you agree to our <Link to="/privacy">Terms & Privacy</Link></p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default RegisterPage;
