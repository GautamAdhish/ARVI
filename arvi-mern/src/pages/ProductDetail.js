import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import plateCutlery from '../Images/plate_cutlery.png';
import siliconBowl from '../Images/silicon_bowl.jpeg';
import Footer from '../components/Footer';

const ProductDetail = () => {
    const { id } = useParams();

    const products = [
        {
            id: 1,
            name: 'Silicone Bowl Set',
            price: '£24.00',
            stock: 99,
            subtitle: 'Soft starter set for everyday feeding',
            description: 'Our Silicone Bowl Set is designed to make the transition to solids easier for both parents and babies. The strong suction base ensures the bowl stays firmly on the table, reducing messes and spills.',
            features: ['100% Food-grade silicone', 'Strong suction base', 'Microwave and dishwasher safe', 'BPA and Phthalate free'],
            image: siliconBowl
        },
        {
            id: 2,
            name: 'Plate + Cutlery Set',
            price: '£32.00',
            stock: 99,
            subtitle: 'Easy-to-hold mealtime essentials',
            description: 'A premium combination of high-quality stainless steel and soft silicone. This set is built to last through the toddler years and beyond, providing a comfortable grip for little hands developing motor skills.',
            features: ['Premium stainless steel', 'Ergonomic silicone handles', 'Divided plate for portion control', 'Heat resistant'], 
            image: plateCutlery
        }
    ];

    const product = products.find(p => p.id === parseInt(id));

    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10) || 1;
        setQuantity(Math.max(1, value));
    };

    const incrementQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prev => Math.max(1, prev - 1));
    };

    if (!product) {
        return <div className="container"><h2>Product not found</h2><Link to="/products">Back to Shop</Link></div>;
    }

    return (
        <>
            <main className="product-detail-page">
                <div className="container">
                    <nav className="breadcrumb">
                        <Link to="/">Home</Link> / <Link to="/products">Shop</Link> / {product.name}
                    </nav>

                    <div className="product-detail-grid">
                        <div className="product-detail-gallery">
                            <img src={product.image} alt={product.name} className="main-product-image" />
                        </div>

                        <div className="product-detail-info">
                            <p className="detail-subtitle">{product.subtitle}</p>
                            <h1 className="detail-title">{product.name}</h1>
                            <p className="detail-price">{product.price}</p>
                            <p className="detail-stock">In Stock: {product.stock}</p>
                            
                            <div className="detail-description">
                                <p>{product.description}</p>
                            </div>

                            <div className="detail-specs">
                                <h3>Key Features</h3>
                                <ul>
                                    {product.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="purchase-actions">
                                <div className="quantity-selector">
                                    <span>Qty</span>
                                    <button onClick={decrementQuantity} className="quantity-btn minus">-</button>
                                    <input type="number" 
                                           value={quantity} 
                                           onChange={handleQuantityChange} 
                                           min="1" className="quantity-input" />
                                    <button onClick={incrementQuantity} className="quantity-btn plus">+</button>
                                </div>
                                <button className="btn-primary add-to-cart">Add to Bag</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ProductDetail;