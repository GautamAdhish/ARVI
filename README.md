# ARVI - Modern Feeding Collection (MERN Stack)

A modern React-based e-commerce website for ARVI baby feeding products. Built with the MERN stack (MongoDB, Express, React, Node.js) - currently implementing the React frontend with backend integration planned.

## Features

✅ **Responsive Design** - Mobile, tablet, and desktop friendly</br>
✅ **Component-Based Architecture** - Reusable React components</br>
✅ **Smooth Navigation** - Smooth scrolling navigation between sections</br>
✅ **Newsletter Signup** - Email subscription with form validation</br>
✅ **Product Showcase** - Dynamic product grid with images</br>
✅ **Benefits Section** - Display key features and benefits</br>
✅ **Contact Section** - Multiple contact channels (Email, Instagram, WhatsApp)</br>
✅ **SEO Optimized** - Semantic HTML structure

## Tech Stack

### Frontend
- **React 18.2.0** - UI Library
- **React DOM 18.2.0** - DOM Rendering
- **React Router DOM 6.15.0** - Client-side routing
- **Axios 1.5.0** - HTTP Client
- **CSS3** - Styling

### Planned Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM library

## Project Structure

```
arvi-mern/
├── public/
│   └── index.html              # Main HTML file
├── src/
│   ├── components/             # React components
│   │   ├── Header.js           # Navigation
│   │   ├── Hero.js             # Hero section
│   │   ├── Products.js         # Product grid
│   │   ├── Benefits.js         # Benefits section
│   │   ├── Lifestyle.js        # Lifestyle section
│   │   ├── Materials.js        # Materials section
│   │   ├── Colour.js           # Color showcase
│   │   ├── About.js            # About section
│   │   ├── Newsletter.js       # Email signup
│   │   ├── Contact.js          # Contact section
│   │   └── Footer.js           # Footer
│   ├── styles/
│   │   └── index.css           # Global styles
│   ├── utils/                  # Utility functions
│   ├── App.js                  # Main App component
│   └── index.js                # React entry point
├── package.json                # Dependencies
├── LOGIC_EXPLANATION.txt       # Detailed logic documentation
└── .gitignore                  # Git ignore rules
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Steps

1. **Navigate to project directory**
   ```bash
   cd arvi-mern
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - Application will automatically open at `http://localhost:3000`

## Available Scripts

### `npm start`
Runs the app in development mode with hot reload.

### `npm build`
Builds the app for production to the `build` folder.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm eject`
⚠️ **Warning: This is irreversible!** Ejects from create-react-app configuration.

## Component Documentation

### Header
- Sticky navigation bar
- Smooth scroll links to sections
- Logo and navigation menu

### Hero
- Full-height hero section with background image
- Call-to-action buttons, with "Browse the collection" opening the products page in a new tab.
- Main headline and description

### Products
- Dynamic product grid (2 columns)
- Product cards with images and descriptions
- Responsive layout

### Benefits
- 6 benefit cards in 2-column grid
- Icon-less minimalist design
- Responsive stacking

### Newsletter
- Email input form
- Form validation
- Success message feedback
- State management with useState

### Contact
- Multiple contact channels
- Email, Instagram, WhatsApp links
- External links open in new tabs

## Styling

- **Global CSS** - All styles in `src/styles/index.css`
- **Color Scheme**:
  - Primary: `#2c3e50` (Dark blue-gray)
  - Accent: `#7cb342` (Sage green)
  - Background: `#f9f8f6` (Off-white)

- **Responsive Breakpoint**: `768px`

## Future Enhancements

- [ ] Backend API Integration
- [ ] User Authentication
- [ ] Shopping Cart & Checkout
- [ ] Payment Integration (Stripe/PayPal)
- [ ] Product Filtering & Search
- [ ] User Reviews & Ratings
- [ ] Blog Section
- [ ] Admin Dashboard
- [ ] Email Notifications
- [ ] SMS Integration

## Performance

- Fast loading times with optimized images
- Efficient component rendering
- CSS classes for minimal bundle size
- Ready for lazy loading optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- WCAG color contrast compliance
- Responsive design for all devices
- Form labels and placeholders

## Deployment

### Frontend Deployment Options

**Vercel** (Recommended)
```bash
npm install -g vercel
vercel
```

**Netlify**
1. Build: `npm run build`
2. Connect to Netlify via GitHub
3. Select build folder: `build/`

**GitHub Pages**
- Add to package.json: `"homepage": "https://yourusername.github.io/arvi-mern"`
- Install gh-pages: `npm install gh-pages --save-dev`
- Add scripts for deploy

## Environment Variables

Create a `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

## Support

For issues or questions:
- Email: hello@arvibaby.com
- Instagram: @arvibaby
- WhatsApp: [Coming soon]

## License

© 2026 ARVI. All rights reserved.

## Contributing

Contributions are welcome! Please follow the code style and create pull requests.

## Changelog

### v1.0.20
- Initial React migration from static HTML
- All components implemented
- Responsive design complete
- Newsletter subscription functionality
- Contact section with multiple channels

---

**Status**: Frontend Ongoing
