import React, { useState } from 'react';
import './styles/index.css';
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
// import JournalPage from './pages/JournalPage'; // Import the new JournalPage
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import plateCutlery from './Images/plate_cutlery.png';
import siliconBowl from './Images/silicon_bowl.jpeg';

function App() {
  const [products, setProducts] = useState([
    {
        id: 1,
        name: 'Silicone Bowl Set',
        price: 24.00,
        stock: 99,
        subtitle: 'Soft starter set for everyday feeding',
        description: 'Our Silicone Bowl Set is designed to make the transition to solids easier for both parents and babies. The strong suction base ensures the bowl stays firmly on the table, reducing messes and spills.',
        features: ['100% Food-grade silicone', 'Strong suction base', 'Microwave and dishwasher safe', 'BPA and Phthalate free'],
        image: siliconBowl
    },
    {
        id: 2,
        name: 'Plate + Cutlery Set',
        price: 32.00,
        stock: 99,
        subtitle: 'Easy-to-hold mealtime essentials',
        description: 'A premium combination of high-quality stainless steel and soft silicone. This set is built to last through the toddler years and beyond, providing a comfortable grip for little hands developing motor skills.',
        features: ['Premium stainless steel', 'Ergonomic silicone handles', 'Divided plate for portion control', 'Heat resistant'],
        image: plateCutlery
    }
  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (productId, quantity) => {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock < quantity) {
        alert('Not enough stock available!');
        return false;
    }

    // Reduce stock
    setProducts(prevProducts => prevProducts.map(p => 
        p.id === productId ? { ...p, stock: p.stock - quantity } : p
    ));

    // Add to cart
    setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === productId);
        if (existingItem) {
            return prevCart.map(item => 
                item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
            );
        }
        return [...prevCart, { ...product, quantity }];
    });

    return true;
  };

  const removeFromCart = (productId) => {
    const cartItem = cart.find(item => item.id === productId);
    if (!cartItem) return;

    // Increase stock when removed from cart
    setProducts(prevProducts => prevProducts.map(p => 
        p.id === productId ? { ...p, stock: p.stock + cartItem.quantity } : p
    ));

    // Remove from cart
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} />
        <Routes>
          <Route
            path="/"
            element={(
              <>
                <Hero />
                <Products />
                <Benefits />
                <Lifestyle />
                <Materials />
                <About /> {/* Keep About on the homepage if it's a section */}
                <Footer />
              </>
            )}
          />
          <Route path="/products" element={<ProductsPage products={products} />} />
          <Route path="/products/:id" element={<ProductDetail products={products} addToCart={addToCart} />} />
          {/* <Route path="/journal" element={<JournalPage />} /> */}
          <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} /> {/* New route for the dedicated ContactPage */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
