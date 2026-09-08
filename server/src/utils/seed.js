require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { connectDB } = require('../config/db');

const User = require('../models/User');
const Product = require('../models/Product');
const { initialProducts } = require('./memoryStore');

const seedData = async () => {
  await connectDB();

  if (mongoose.connection.readyState !== 1) {
    console.log('⚠️  No DB connection - skipping seed (memory mode will auto-seed)');
    process.exit(0);
  }

  try {
    // Clear existing
    await Product.deleteMany();
    await User.deleteMany();

    console.log('🗑️  Cleared existing data');

    // Create admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@arvibaby.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

    const admin = await User.create({
      name: 'ARVI Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });

    const demoUser = await User.create({
      name: 'Demo Parent',
      email: 'demo@arvibaby.com',
      password: 'demo123',
      role: 'user',
    });

    console.log(`👤 Created admin: ${admin.email}`);
    console.log(`👤 Created demo user: ${demoUser.email}`);

    // Create products (strip _id to let Mongo generate)
    const productsToInsert = initialProducts.map(({ _id, id, ...rest }) => ({
      ...rest,
      sku: rest.sku,
    }));

    const createdProducts = await Product.insertMany(productsToInsert);
    console.log(`📦 Created ${createdProducts.length} products`);

    console.log('✅ Seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
