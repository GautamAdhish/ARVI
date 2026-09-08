import React from 'react';
import './styles/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';

import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import Benefits from './components/Benefits';
import Lifestyle from './components/Lifestyle';
import Materials from './components/Materials';
import About from './components/About';
import Footer from './components/Footer';

import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import AdminPage from './pages/AdminPage';
import PrivacyPage from './pages/PrivacyPage';

function HomePage() {
  return (
    <>
      <Hero />
      <Products />
      <Benefits />
      <Lifestyle />
      <Materials />
      <About />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <div className="App">
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="*" element={
                  <div style={{ padding: '100px 20px', textAlign: 'center' }}>
                    <h1>404 - Page Not Found</h1>
                    <p>The page you're looking for doesn't exist.</p>
                    <a href="/" style={{ color: '#7cb342' }}>Go Home</a>
                  </div>
                } />
              </Routes>
            </div>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
