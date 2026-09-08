const asyncHandler = require('express-async-handler');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { isMemoryMode } = require('../config/db');
const { memoryDB, generateId } = require('../utils/memoryStore');

// Helper to get product price
const getProductData = async (productId) => {
  if (isMemoryMode()) {
    return memoryDB.products.find((p) => p._id === productId || String(p.id) === String(productId));
  } else {
    if (productId.match(/^[0-9a-fA-F]{24}$/)) {
      return await Product.findById(productId);
    }
    return await Product.findOne({ $or: [{ _id: productId }, { slug: productId }] });
  }
};

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  if (isMemoryMode()) {
    let cart = memoryDB.carts.find((c) => c.user === req.user._id);
    if (!cart) {
      cart = { _id: generateId(), user: req.user._id, items: [], createdAt: new Date(), updatedAt: new Date() };
      memoryDB.carts.push(cart);
    }
    // Populate products
    const populatedItems = cart.items.map((item) => {
      const prod = memoryDB.products.find((p) => p._id === item.product);
      return { ...item, product: prod || { _id: item.product, name: 'Product not found' } };
    });
    const total = populatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    res.json({ success: true, data: { ...cart, items: populatedItems, total } });
    return;
  }

  let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }
  const total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  res.json({ success: true, data: { ...cart.toObject(), total } });
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    res.status(400);
    throw new Error('Product ID is required');
  }

  const product = await getProductData(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (product.stock !== undefined && product.stock < quantity) {
    res.status(400);
    throw new Error(`Only ${product.stock} items in stock`);
  }

  if (isMemoryMode()) {
    let cart = memoryDB.carts.find((c) => c.user === req.user._id);
    if (!cart) {
      cart = { _id: generateId(), user: req.user._id, items: [], createdAt: new Date(), updatedAt: new Date() };
      memoryDB.carts.push(cart);
    }

    const existingIndex = cart.items.findIndex((i) => i.product === product._id || String(i.product) === String(product._id));
    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += Number(quantity);
    } else {
      cart.items.push({
        _id: generateId(),
        product: product._id,
        quantity: Number(quantity),
        price: product.price,
      });
    }
    cart.updatedAt = new Date();
    res.json({ success: true, data: cart });
    return;
  }

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }

  const existingItem = cart.items.find((item) => item.product.toString() === product._id.toString());
  if (existingItem) {
    existingItem.quantity += Number(quantity);
  } else {
    cart.items.push({ product: product._id, quantity: Number(quantity), price: product.price });
  }

  await cart.save();
  await cart.populate('items.product');
  res.json({ success: true, data: cart });
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/:itemId
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const { itemId } = req.params;

  if (quantity < 1) {
    res.status(400);
    throw new Error('Quantity must be at least 1');
  }

  if (isMemoryMode()) {
    const cart = memoryDB.carts.find((c) => c.user === req.user._id);
    if (!cart) {
      res.status(404);
      throw new Error('Cart not found');
    }
    const item = cart.items.find((i) => i._id === itemId);
    if (!item) {
      res.status(404);
      throw new Error('Item not found in cart');
    }
    item.quantity = Number(quantity);
    cart.updatedAt = new Date();
    res.json({ success: true, data: cart });
    return;
  }

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  const item = cart.items.id(itemId);
  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  item.quantity = Number(quantity);
  await cart.save();
  await cart.populate('items.product');
  res.json({ success: true, data: cart });
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  if (isMemoryMode()) {
    const cart = memoryDB.carts.find((c) => c.user === req.user._id);
    if (!cart) {
      res.status(404);
      throw new Error('Cart not found');
    }
    cart.items = cart.items.filter((i) => i._id !== itemId && i.product !== itemId);
    cart.updatedAt = new Date();
    res.json({ success: true, data: cart });
    return;
  }

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  cart.items = cart.items.filter((item) => item._id.toString() !== itemId && item.product.toString() !== itemId);
  await cart.save();
  await cart.populate('items.product');
  res.json({ success: true, data: cart });
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
  if (isMemoryMode()) {
    const cart = memoryDB.carts.find((c) => c.user === req.user._id);
    if (cart) {
      cart.items = [];
      cart.updatedAt = new Date();
    }
    res.json({ success: true, data: cart || { items: [] } });
    return;
  }

  const cart = await Cart.findOne({ user: req.user._id });
  if (cart) {
    cart.items = [];
    await cart.save();
  }
  res.json({ success: true, data: cart || { items: [] } });
});

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
