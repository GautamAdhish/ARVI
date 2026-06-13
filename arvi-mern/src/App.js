import React from 'react';
import './styles/index.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import Benefits from './components/Benefits';
import Lifestyle from './components/Lifestyle';
import Materials from './components/Materials';
import Colour from './components/Colour';
import About from './components/About';
import Newsletter from './components/Newsletter';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
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
                <About />
                <Newsletter />
                <Contact />
                <Footer />
              </>
            )}
          />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
