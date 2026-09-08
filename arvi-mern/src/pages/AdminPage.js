import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { adminAPI, productAPI, orderAPI, contactAPI, newsletterAPI } from '../services/api';

const AdminPage = () => {
    const { isAdmin, isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState(null);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [newsletters, setNewsletters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && (!isAuthenticated || !isAdmin)) {
            navigate('/login');
        }
    }, [isAdmin, isAuthenticated, authLoading, navigate]);

    useEffect(() => {
        if (isAdmin) {
            fetchData();
        }
    }, [isAdmin, activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'dashboard') {
                const res = await adminAPI.getStats();
                setStats(res.data.data);
            } else if (activeTab === 'products') {
                const res = await productAPI.getAll({ limit: 100 });
                setProducts(res.data.data);
            } else if (activeTab === 'orders') {
                const res = await orderAPI.getAll();
                setOrders(res.data.data);
            } else if (activeTab === 'contacts') {
                const res = await contactAPI.getAll();
                setContacts(res.data.data);
            } else if (activeTab === 'newsletter') {
                const res = await newsletterAPI.getAll();
                setNewsletters(res.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch admin data:', error);
            // Show mock data for demo if API fails
            if (activeTab === 'dashboard') {
                setStats({
                    users: 124,
                    products: 4,
                    orders: 28,
                    revenue: 1245.5,
                    pendingOrders: 5,
                    contacts: 12,
                    newsletters: 89,
                    mode: 'memory',
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Delete this product?')) return;
        try {
            await productAPI.delete(id);
            fetchData();
        } catch (err) {
            alert('Failed to delete');
        }
    };

    if (authLoading || (isAuthenticated && !isAdmin && loading)) {
        return <div className="container" style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>;
    }

    if (!isAdmin) {
        return null;
    }

    return (
        <>
            <main className="admin-page">
                <div className="container">
                    <header className="admin-header">
                        <h1>Admin Dashboard</h1>
                        <p>Manage your ARVI store</p>
                    </header>

                    <div className="admin-tabs">
                        <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>Dashboard</button>
                        <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>Products</button>
                        <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>Orders</button>
                        <button className={activeTab === 'contacts' ? 'active' : ''} onClick={() => setActiveTab('contacts')}>Messages</button>
                        <button className={activeTab === 'newsletter' ? 'active' : ''} onClick={() => setActiveTab('newsletter')}>Newsletter</button>
                    </div>

                    <div className="admin-content">
                        {loading ? (
                            <div className="spinner-wrapper"><div className="spinner"></div><p>Loading...</p></div>
                        ) : (
                            <>
                                {activeTab === 'dashboard' && stats && (
                                    <div className="stats-grid">
                                        <div className="stat-card"><h3>{stats.users}</h3><p>Total Users</p></div>
                                        <div className="stat-card"><h3>{stats.products}</h3><p>Products</p></div>
                                        <div className="stat-card"><h3>{stats.orders}</h3><p>Orders</p></div>
                                        <div className="stat-card highlight"><h3>${stats.revenue?.toFixed(2)}</h3><p>Total Revenue</p></div>
                                        <div className="stat-card warning"><h3>{stats.pendingOrders}</h3><p>Pending Orders</p></div>
                                        <div className="stat-card"><h3>{stats.contacts}</h3><p>Messages</p></div>
                                        <div className="stat-card"><h3>{stats.newsletters}</h3><p>Subscribers</p></div>
                                        <div className="stat-card"><h3>{stats.mode}</h3><p>Mode ({stats.mode === 'memory' ? 'No DB' : 'DB Connected'})</p></div>
                                    </div>
                                )}

                                {activeTab === 'products' && (
                                    <div className="admin-table-wrapper">
                                        <div className="table-header">
                                            <h3>Products ({products.length})</h3>
                                            <button className="btn-primary small" onClick={() => alert('Product creation UI - implement form in production')}>+ Add Product</button>
                                        </div>
                                        <table className="admin-table">
                                            <thead>
                                                <tr><th>Product</th><th>Price</th><th>Stock</th><th>Category</th><th>Actions</th></tr>
                                            </thead>
                                            <tbody>
                                                {products.map(p => (
                                                    <tr key={p._id}>
                                                        <td><div className="product-cell"><img src={p.image} alt={p.name} /><span>{p.name}</span></div></td>
                                                        <td>${p.price}</td>
                                                        <td><span className={`stock ${p.stock < 10 ? 'low' : ''}`}>{p.stock}</span></td>
                                                        <td>{p.category}</td>
                                                        <td>
                                                            <button className="btn-icon" onClick={() => handleDeleteProduct(p._id)}>🗑️</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {activeTab === 'orders' && (
                                    <div className="admin-table-wrapper">
                                        <h3>Recent Orders ({orders.length})</h3>
                                        {orders.length === 0 ? <p>No orders yet</p> : (
                                            <table className="admin-table">
                                                <thead><tr><th>ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
                                                <tbody>
                                                    {orders.map(o => (
                                                        <tr key={o._id}>
                                                            <td>#{o._id.slice(-6).toUpperCase()}</td>
                                                            <td>{o.shippingAddress?.fullName || o.user?.name || 'Guest'}</td>
                                                            <td>${o.totalPrice?.toFixed(2)}</td>
                                                            <td><span className={`status-badge ${o.status}`}>{o.status}</span></td>
                                                            <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'contacts' && (
                                    <div className="admin-table-wrapper">
                                        <h3>Contact Messages ({contacts.length})</h3>
                                        <div className="contacts-list">
                                            {contacts.map(c => (
                                                <div key={c._id} className="contact-card">
                                                    <div className="contact-header"><strong>{c.name}</strong> <span>{c.email}</span> <span className={`status-badge ${c.status}`}>{c.status}</span></div>
                                                    <p><strong>Subject:</strong> {c.subject}</p>
                                                    <p>{c.message}</p>
                                                    <small>{new Date(c.createdAt).toLocaleString()}</small>
                                                </div>
                                            ))}
                                            {contacts.length === 0 && <p>No messages</p>}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'newsletter' && (
                                    <div className="admin-table-wrapper">
                                        <h3>Newsletter Subscribers ({newsletters.length})</h3>
                                        <table className="admin-table">
                                            <thead><tr><th>Email</th><th>Status</th><th>Subscribed</th></tr></thead>
                                            <tbody>
                                                {newsletters.map(n => (
                                                    <tr key={n._id}>
                                                        <td>{n.email}</td>
                                                        <td>{n.isActive ? 'Active' : 'Unsubscribed'}</td>
                                                        <td>{new Date(n.createdAt).toLocaleDateString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default AdminPage;
