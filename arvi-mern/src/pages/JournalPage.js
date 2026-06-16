import React from 'react';
import Footer from '../components/Footer';

const JournalPage = () => {
    const journalEntries = [
        {
            id: 1,
            title: 'The Joy of Mindful Mealtimes',
            date: 'June 15, 2026',
            content: `
                In today's fast-paced world, mealtimes can often feel rushed and chaotic, especially with little ones.
                At ARVI, we believe in the power of mindful mealtimes – moments where families can connect,
                savor food, and practice gratitude. It's not just about what's on the plate, but the atmosphere
                we create around it. Simple steps like turning off screens, engaging in conversation, and
                allowing children to explore their food can transform a meal into a cherished memory.
                Our products are designed to support this philosophy, making the practical aspects of feeding
                seamless so you can focus on what truly matters: togetherness.
            `,
            image: 'https://images.unsplash.com/photo-1514997130082-6a47c3f7f1c2?auto=format&fit=crop&w=800&q=80' // Example image
        },
        {
            id: 2,
            title: 'Why Material Matters: Our Commitment to Safety',
            date: 'May 28, 2026',
            content: `
                When it comes to products for your children, safety is paramount. This is why ARVI is
                unwavering in its commitment to using only the highest quality, food-grade materials.
                From BPA-free silicone to durable stainless steel, every component is rigorously tested
                to ensure it meets and exceeds safety standards. We understand that parents have enough
                to worry about, so we take the guesswork out of material selection, providing you with
                peace of mind. Learn more about our material choices and why they are the best for your family.
            `,
            image: 'https://images.unsplash.com/photo-1582210775829-8e8334d7d592?auto=format&fit=crop&w=800&q=80' // Example image
        }
    ];

    return (
        <>
            <main className="journal-page-section container">
                <h1 className="journal-title">Our Journal</h1>
                <p className="journal-intro">Thoughts, tips, and stories from the ARVI family.</p>
                {journalEntries.map(entry => (
                    <article key={entry.id} className="journal-entry">
                        <h2 className="entry-title">{entry.title}</h2>
                        <p className="entry-date">{entry.date}</p>
                        {entry.image && <img src={entry.image} alt={entry.title} className="entry-image" />}
                        <p className="entry-content">{entry.content}</p>
                    </article>
                ))}
            </main>
            <Footer />
        </>
    );
};

export default JournalPage;