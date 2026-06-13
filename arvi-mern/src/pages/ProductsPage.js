import React from 'react';

const ProductsPage = () => {
    const products = [
        {
            id: 1,
            name: 'Placeholder Product Name',
            subtitle: 'Soft starter set for everyday feeding',
            description: 'A calm, simple starter product page while the final collection details are being prepared.'
        },
        {
            id: 2,
            name: 'Placeholder Product Name',
            subtitle: 'Easy-to-hold mealtime essentials',
            description: 'This space is ready for the real product photos, names, and pricing when you are ready.'
        },
        {
            id: 3,
            name: 'Placeholder Product Name',
            subtitle: 'Designed for little hands',
            description: 'Keep this as a temporary product card until the final line-up is finalized.'
        }
    ];

    return (
        <main className="products-page">
            <section className="products-page-hero">
                <div className="container">
                    <p className="products-page-kicker">ARVI Collection</p>
                    <h1>Products</h1>
                    <p className="products-page-intro">
                        A simple placeholder page for the ARVI product collection. Replace the names and details whenever the final range is ready.
                    </p>
                </div>
            </section>

            <section className="products-page-grid-section">
                <div className="container">
                    <div className="products-page-grid">
                        {products.map((product) => (
                            <article key={product.id} className="product-page-card">
                                <div className="product-page-image">ARVI</div>
                                <div className="product-page-content">
                                    <p className="product-page-subtitle">{product.subtitle}</p>
                                    <h2>{product.name}</h2>
                                    <p>{product.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProductsPage;