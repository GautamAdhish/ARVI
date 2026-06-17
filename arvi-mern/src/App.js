import React from 'react';
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
// import JournalPage from './pages/JournalPage'; // Import the new JournalPage
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
                <About /> {/* Keep About on the homepage if it's a section */}
                <Footer />
              </>
            )}
          />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          {/* <Route path="/journal" element={<JournalPage />} /> */}
          <Route path="/contact" element={<ContactPage />} /> {/* New route for the dedicated ContactPage */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
