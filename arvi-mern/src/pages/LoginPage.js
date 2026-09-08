import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(formData.email, formData.password);
        
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    const fillDemo = (type) => {
        if (type === 'admin') {
            setFormData({ email: 'admin@arvibaby.com', password: 'Admin@123' });
        } else {
            setFormData({ email: 'demo@arvibaby.com', password: 'demo123' });
        }
    };

    return (
        <>
            <main className="auth-page">
                <div className="container">
                    <div className="auth-card">
                        <div className="auth-header">
                            <h1>Welcome back</h1>
                            <p>Sign in to your ARVI account</p>
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <form onSubmit={handleSubmit} className="auth-form">
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
                            <button type="submit" className="btn-primary full-width" disabled={loading}>
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>

                        <div className="demo-credentials">
                            <p>Quick demo login:</p>
                            <div className="demo-buttons">
                                <button type="button" onClick={() => fillDemo('user')} className="btn-demo">Demo User</button>
                                <button type="button" onClick={() => fillDemo('admin')} className="btn-demo admin">Admin</button>
                            </div>
                        </div>

                        <div className="auth-footer">
                            <p>Don't have an account? <Link to="/register">Create one</Link></p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default LoginPage;
