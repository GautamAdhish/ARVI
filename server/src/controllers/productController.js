const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const { isMemoryMode } = require('../config/db');
const { memoryDB, generateId } = require('../utils/memoryStore');

// @desc    Get all products with filters, search, pagination
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const { search, category, featured, sort = '-createdAt', page = 1, limit = 12, minPrice, maxPrice } = req.query;

  if (isMemoryMode()) {
    let filtered = [...memoryDB.products].filter((p) => p.isActive !== false);

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q)
      );
    }
    if (category && category !== 'all') {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (featured === 'true') {
      filtered = filtered.filter((p) => p.isFeatured);
    }
    if (minPrice) filtered = filtered.filter((p) => p.price >= Number(minPrice));
    if (maxPrice) filtered = filtered.filter((p) => p.price <= Number(maxPrice));

    // sort
    if (sort === 'price') filtered.sort((a, b) => a.price - b.price);
    else if (sort === '-price') filtered.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    else filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const total = filtered.length;
    const pg = Number(page);
    const lim = Number(limit);
    const start = (pg - 1) * lim;
    const paginated = filtered.slice(start, start + lim);

    res.json({
      success: true,
      data: paginated,
      pagination: {
        page: pg,
        limit: lim,
        total,
        pages: Math.ceil(total / lim),
      },
    });
    return;
  }

  // MongoDB path
  const query = { isActive: true };
  if (search) {
    query.$text = { $search: search };
  }
  if (category && category !== 'all') query.category = category;
  if (featured === 'true') query.isFeatured = true;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const sortMap = {
    price: { price: 1 },
    '-price': { price: -1 },
    rating: { rating: -1 },
    '-createdAt': { createdAt: -1 },
    createdAt: { createdAt: 1 },
  };

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const total = await Product.countDocuments(query);
  const products = await Product.find(query)
    .sort(sortMap[sort] || { createdAt: -1 })
    .skip(skip)
    .limit(limitNum);

  res.json({
    success: true,
    data: products,
    pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
  });
});

// @desc    Get single product by id or slug
// @route   GET /api/products/:id
// @access  Public
const getProduct = asyncHandler(async (req, res) => {
  const identifier = req.params.id;

  if (isMemoryMode()) {
    const product = memoryDB.products.find((p) => p._id === identifier || p.slug === identifier || String(p.id) === identifier);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json({ success: true, data: product });
    return;
  }

  let product = null;
  if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
    product = await Product.findById(identifier);
  }
  if (!product) {
    product = await Product.findOne({ slug: identifier });
  }
  if (!product) {
    product = await Product.findOne({ $or: [{ slug: identifier }, { name: identifier }] });
  }

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json({ success: true, data: product });
});

// @desc    Create product (Admin)
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const data = req.body;

  if (isMemoryMode()) {
    const newProduct = {
      _id: generateId(),
      id: memoryDB.products.length + 1,
      slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      isActive: true,
      isFeatured: false,
      rating: 0,
      numReviews: 0,
      reviews: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };
    memoryDB.products.push(newProduct);
    res.status(201).json({ success: true, data: newProduct });
    return;
  }

  const product = await Product.create(data);
  res.status(201).json({ success: true, data: product });
});

// @desc    Update product (Admin)
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  if (isMemoryMode()) {
    const idx = memoryDB.products.findIndex((p) => p._id === req.params.id);
    if (idx === -1) {
      res.status(404);
      throw new Error('Product not found');
    }
    memoryDB.products[idx] = { ...memoryDB.products[idx], ...req.body, updatedAt: new Date() };
    res.json({ success: true, data: memoryDB.products[idx] });
    return;
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ success: true, data: product });
});

// @desc    Delete product (Admin)
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  if (isMemoryMode()) {
    const idx = memoryDB.products.findIndex((p) => p._id === req.params.id);
    if (idx === -1) {
      res.status(404);
      throw new Error('Product not found');
    }
    memoryDB.products.splice(idx, 1);
    res.json({ success: true, message: 'Product removed' });
    return;
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  await product.deleteOne();
  res.json({ success: true, message: 'Product removed' });
});

// @desc    Add review
// @route   POST /api/products/:id/reviews
// @access  Private
const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  if (isMemoryMode()) {
    const product = memoryDB.products.find((p) => p._id === req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    const alreadyReviewed = product.reviews.find((r) => r.user === req.user._id || r.user?.toString() === req.user._id);
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
      createdAt: new Date(),
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length;
    res.status(201).json({ success: true, message: 'Review added', data: product });
    return;
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString());
  if (alreadyReviewed) {
    res.status(400);
    throw new Error('Product already reviewed');
  }

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating = product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length;

  await product.save();
  res.status(201).json({ success: true, message: 'Review added', data: product });
});

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct, addReview };
