import React from 'react';

const Materials = () => {
    const materials = [
        { id: 1, name: 'Food-Grade Silicone', desc: '100% safe, soft, and durable. No BPA, PVC, or phthalates.', icon: '🌿' },
        { id: 2, name: '304 Stainless Steel', desc: 'Premium cutlery that lasts years. No rust, no chemicals.', icon: '🥄' },
        { id: 3, name: 'Lab Tested', desc: 'Certified safe for babies 6M+. Meets international standards.', icon: '🔬' },
        { id: 4, name: 'Easy to Clean', desc: 'Dishwasher, microwave, and sterilizer safe. Because parents are busy.', icon: '✨' }
    ];

    return (
        <section className="materials">
            <div className="container">
                <div className="section-header">
                    <h2>Safe Materials You Can Trust</h2>
                    <p className="section-subtitle">We believe in transparency and safety above all else</p>
                </div>
                <div className="materials-grid">
                    {materials.map((material) => (
                        <div key={material.id} className="material-item enhanced">
                            <div className="material-icon">{material.icon}</div>
                            <h4>{material.name}</h4>
                            <p>{material.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Materials;
