import React from 'react';

// Icons use consistent stroke width, size, and monochromatic style.
const IconShield = () => (
  <svg
    width="40"
    height="40"
    viewBox="-4 -2 32 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M12 4L19 6.8V10.2C19 13.8 16.4 16.7 12 18.8C7.6 16.7 5 13.8 5 10.2V6.8L12 4Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.7 11.2L11.5 13L14.9 9.6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconLeaf = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path
      d="M18.5 4C13.5 5.5 9.5 9.5 8 15c-1.5-3.5.5-7.5 4.5-10.5 2-1.5 4-1.7 6-.5Z"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5 8.5C13 10.5 15.2 13.3 16.5 17"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      opacity="0.8"
    />
  </svg>
);

const IconHand = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path
      d="M7 13c1-3.5 3.8-5.5 7.5-5.5 2 0 3.5.7 4.5 2v5.5A3.5 3.5 0 0 1 15.5 18.5H9a3.5 3.5 0 0 1-3.3-2.5L7 13Z"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 10.5V8.3"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
    />
  </svg>
);

const IconPalette = () => (
  <svg
    width="40"
    height="40"
    viewBox="-4 -2 32 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M12 4C7 4 4 7.3 4 11.5C4 15.5 7.1 18.5 11 18.5C12.8 18.5 14 17.7 14 16.5C14 15.5 13.2 14.9 12.2 14.9C10.7 14.9 9.7 13.9 9.7 12.5C9.7 11 10.8 10 12.4 10H13.5C16.2 10 18.2 8.3 18.2 6.3C18.2 4.9 16.3 4 12 4Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8.4" cy="9.2" r="1.1" fill="currentColor" opacity="0.85" />
    <circle cx="12.2" cy="8.1" r="1.1" fill="currentColor" opacity="0.7" />
    <circle cx="15.6" cy="9.4" r="1.1" fill="currentColor" opacity="0.55" />
  </svg>
);

const IconStar = () => (
  <svg
    width="36"
    height="36"
    viewBox="-2 -2 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M12 3.5L13.8 8.2L18.5 10L13.8 11.8L12 16.5L10.2 11.8L5.5 10L10.2 8.2L12 3.5Z"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconDroplet = () => (
  <svg
    width="36"
    height="36"
    viewBox="-2 -2 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M12 4C12 4 16 8.8 16 12a4 4 0 1 1-8 0c0-3.2 4-8 4-8z"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Benefits = () => {
    const benefits = [
      {
        id: 1,
        icon: <IconShield />,
        title: 'Safe materials you can trust at every meal',
        description: 'We choose food‑grade silicone and stainless steel so you don\'t have to worry about what touches their food.'
      },
      {
        id: 2,
        icon: <IconLeaf />,
        title: 'Made with everyday peace of mind',
        description: 'No BPA or harsh chemicals—just calm, practical pieces built for daily use.'
      },
      {
        id: 3,
        icon: <IconHand />,
        title: 'Designed for tiny hands learning big skills',
        description: 'Soft edges and easy grips help little ones practice feeding while you stay nearby.'
      },
      {
        id: 4,
        icon: <IconPalette />,
        title: 'Soft colours that fit beautifully into your home',
        description: 'A gentle palette that complements your table instead of shouting for attention.'
      },
      {
        id: 5,
        icon: <IconStar />,
        title: 'Helping confidence grow, one meal at a time',
        description: 'Built to reduce spills and encourage small wins—so mealtimes feel calmer.'
      },
      {
        id: 6,
        icon: <IconDroplet />,
        title: "Because parents already have enough to do",
        description: 'Dishwasher‑safe and easy to rinse—made to save a few extra minutes in your day.'
      }
    ];

    return (
        <section className="why-arvi warm-why">
            <div className="container">
                <h2 className="warm-heading">Why parents pick ARVI</h2>
                <p className="warm-sub">Thoughtfully designed for everyday family moments.</p>

                <div className="benefits-grid warm-grid">
                    {benefits.map((benefit, idx) => (
                        <div key={benefit.id} className={`benefit-item size-${(idx % 3) + 1}`}>
                            <div className="benefit-icon">{benefit.icon}</div>
                            <div className="benefit-content">
                                <h4>{benefit.title}</h4>
                                <p>{benefit.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;
