import React from 'react';

const Materials = () => {
    const materials = [
        { id: 1, name: 'Food-Grade Silicone' },
        { id: 2, name: 'Stainless Steel Cutlery' },
        { id: 3, name: 'BPA-Free' },
        { id: 4, name: 'Easy to Clean' }
    ];

    return (
        <section className="materials">
            <div className="container">
                <h2>Safe Materials You Can Trust</h2>
                <p className="materials-intro">We believe in transparency and safety above all else</p>
                <div className="materials-grid">
                    {materials.map((material) => (
                        <div key={material.id} className="material-item">
                            <h4>{material.name}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Materials;
