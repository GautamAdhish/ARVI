// In-memory fallback when MongoDB is not available
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('crypto') ? {} : {};

// Simple ID generator
const generateId = () => Math.random().toString(36).substring(2, 10) + Date.now().toString(36);

const initialProducts = [
  {
    _id: 'prod_1',
    id: 1,
    name: 'Silicone Bowl Set',
    subtitle: 'Suction Base • Food-Grade Silicone',
    slug: 'silicone-bowl-set',
    description: 'Soft, stable bowls that stay put — great for toddlers learning to scoop. Made with 100% food-grade silicone, these bowls feature a strong suction base to minimize spills and encourage independent eating.',
    shortDescription: 'Soft, stable bowls that stay put — great for toddlers learning to scoop.',
    price: 24.99,
    comparePrice: 32.99,
    image: '/images/bowl.jpg',
    images: ['/images/bowl.jpg'],
    category: 'bowls',
    materials: ['Food-Grade Silicone', 'BPA-Free'],
    colors: [{ name: 'Dusty Pink', hex: '#d58a94' }, { name: 'Sage', hex: '#9eb3a3' }],
    features: ['Strong suction base', 'Microwave & dishwasher safe', 'BPA, PVC & Phthalate free', 'Soft rounded edges', 'Stackable design'],
    stock: 48,
    sku: 'ARVI-BOWL-001',
    isFeatured: true,
    isActive: true,
    rating: 4.8,
    numReviews: 124,
    reviews: [],
    dimensions: { weight: '180g', size: '12cm diameter' },
    careInstructions: ['Dishwasher safe', 'Microwave safe', 'Sterilizer safe'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 'prod_2',
    id: 2,
    name: 'Plate + Cutlery Set',
    subtitle: 'Stainless Steel • Silicone Grip',
    slug: 'plate-cutlery-set',
    description: 'Stainless cutlery with a comfortable silicone grip — built to last and easy to hold. Our divided plate keeps foods separate and makes mealtimes more manageable for little ones.',
    shortDescription: 'Stainless cutlery with a comfortable silicone grip — built to last and easy to hold.',
    price: 34.99,
    comparePrice: 44.99,
    image: '/images/plate.jpg',
    images: ['/images/plate.jpg'],
    category: 'sets',
    materials: ['304 Stainless Steel', 'Food-Grade Silicone'],
    colors: [{ name: 'Dusty Pink', hex: '#d58a94' }, { name: 'Clay', hex: '#c4a484' }],
    features: ['Divided sections', 'Non-slip base', 'Ergonomic handles', 'Dishwasher safe', 'Grows with your child'],
    stock: 32,
    sku: 'ARVI-SET-001',
    isFeatured: true,
    isActive: true,
    rating: 4.9,
    numReviews: 89,
    reviews: [],
    dimensions: { weight: '320g', size: '20cm plate' },
    careInstructions: ['Dishwasher safe', 'Do not microwave steel cutlery'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 'prod_3',
    id: 3,
    name: 'Sippy Cup',
    subtitle: 'Leak-Proof • Easy Transition',
    slug: 'sippy-cup',
    description: 'Designed for little hands transitioning from bottle to cup. Leak-proof, easy to clean, and perfectly sized for toddler grip.',
    shortDescription: 'Leak-proof cup designed for easy transition and tiny hands.',
    price: 18.99,
    comparePrice: 24.99,
    image: '/images/cup.jpg',
    images: ['/images/cup.jpg'],
    category: 'accessories',
    materials: ['Food-Grade Silicone', 'PP'],
    colors: [{ name: 'Sage', hex: '#9eb3a3' }, { name: 'Dusty Pink', hex: '#d58a94' }],
    features: ['Leak-proof lid', 'Soft spout', 'Easy-grip handles', 'BPA free'],
    stock: 65,
    sku: 'ARVI-CUP-001',
    isFeatured: true,
    isActive: true,
    rating: 4.7,
    numReviews: 56,
    reviews: [],
    dimensions: { weight: '120g', size: '150ml' },
    careInstructions: ['Dishwasher safe', 'Sterilizer safe'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 'prod_4',
    id: 4,
    name: 'Complete Mealtime Kit',
    subtitle: 'Bowl + Plate + Cutlery + Cup',
    slug: 'complete-mealtime-kit',
    description: 'Everything you need for stress-free mealtimes. Our complete kit includes bowl set, plate with cutlery, and sippy cup — all in matching Dusty Pink.',
    shortDescription: 'The ultimate starter kit for modern families.',
    price: 69.99,
    comparePrice: 89.99,
    image: '/images/kit.jpg',
    images: ['/images/kit.jpg'],
    category: 'sets',
    materials: ['Food-Grade Silicone', '304 Stainless Steel'],
    colors: [{ name: 'Dusty Pink', hex: '#d58a94' }],
    features: ['Complete 4-piece set', 'Gift-ready packaging', 'Saves 20% vs individual', 'Coordinated colors'],
    stock: 20,
    sku: 'ARVI-KIT-001',
    isFeatured: true,
    isActive: true,
    rating: 5.0,
    numReviews: 34,
    reviews: [],
    dimensions: { weight: '650g', size: 'Gift box' },
    careInstructions: ['See individual items'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const memoryDB = {
  users: [],
  products: [...initialProducts],
  carts: [],
  orders: [],
  newsletters: [],
  contacts: [],
};

const initMemoryAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@arvibaby.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
  
  if (!memoryDB.users.find(u => u.email === adminEmail)) {
    const hashed = await bcrypt.hash(adminPassword, 10);
    memoryDB.users.push({
      _id: 'user_admin_1',
      name: 'ARVI Admin',
      email: adminEmail,
      password: hashed,
      role: 'admin',
      avatar: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log(`👤 Memory Admin seeded: ${adminEmail}`);
  }
};

module.exports = { memoryDB, initialProducts, initMemoryAdmin, generateId };
