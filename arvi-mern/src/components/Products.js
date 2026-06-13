import React from 'react';
import plateCutlery from '../Images/plate_cutlery.png';
import siliconBowl from '../Images/silicon_bowl.jpeg';

const Products = () => {
    const products = [
        {
            id: 1,
            title: 'Silicone Bowl Set',
            description: 'Soft, stable bowls that stay put — great for toddlers learning to scoop.',
            image: siliconBowl
        },
        {
            id: 2,
            title: 'Plate + Cutlery Set',
            description: 'Stainless cutlery with a comfortable silicone grip — built to last and easy to hold.',
            image: plateCutlery
        }
    ];

    return (
        <section className="products" id="products">
            <div className="container">
                <h2>Our Collection</h2>
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <div 
                                className="product-image"
                                style={{ backgroundImage: `url('${product.image}')` }}
                            ></div>
                            <h3>{product.title}</h3>
                            <p>{product.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
