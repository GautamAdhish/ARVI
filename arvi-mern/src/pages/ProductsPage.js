import React from 'react';
import { Link } from 'react-router-dom';
import plateCutlery from '../Images/plate_cutlery.png';
import siliconBowl from '../Images/silicon_bowl.jpeg';

const ProductsPage = () => {
    const products = [
        {
            id: 1,
            name: 'Silicone Bowl Set',
            subtitle: 'Soft starter set for everyday feeding',
            description: 'Soft, stable bowls that stay put — great for toddlers learning to scoop.',
            image: siliconBowl
        },
        {
            id: 2,
            name: 'Plate + Cutlery Set',
            subtitle: 'Easy-to-hold mealtime essentials',
            description: 'Stainless cutlery with a comfortable silicone grip — built to last and easy to hold.',
            image: plateCutlery
        }
    ];

    return (
        <main className="products-page">
            <section className="products-page-hero">
                <div className="container">
                    <p className="products-page-kicker">ARVI Collection</p>
                    <h1>Shop the Range</h1>
                    <p className="products-page-intro">
                        Thoughtfully designed feeding essentials for your home.
                    </p>
                </div>
            </section>

            <section className="products-page-grid-section">
                <div className="container">
                    <div className="products-page-grid">
                        {products.map((product) => (
                            <Link to={`/products/${product.id}`} key={product.id} className="product-link-wrapper">
                                <article className="product-page-card">
                                    <div 
                                        className="product-page-image"
                                        style={{ backgroundImage: product.image ? `url('${product.image}')` : 'none' }}
                                    >
                                        {!product.image && 'ARVI'}
                                    </div>
                                    <div className="product-page-content">
                                        <p className="product-page-subtitle">{product.subtitle}</p>
                                        <h2>{product.name}</h2>
                                        <p>{product.description}</p>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProductsPage;