const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { isMemoryMode } = require('../config/db');
const { memoryDB, generateId } = require('../utils/memoryStore');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  if (!shippingAddress || !paymentMethod) {
    res.status(400);
    throw new Error('Shipping address and payment method required');
  }

  if (isMemoryMode()) {
    const cart = memoryDB.carts.find((c) => c.user === req.user._id);
    if (!cart || cart.items.length === 0) {
      res.status(400);
      throw new Error('Cart is empty');
    }

    const orderItems = cart.items.map((item) => {
      const prod = memoryDB.products.find((p) => p._id === item.product);
      return {
        product: item.product,
        name: prod ? prod.name : 'Product',
        image: prod ? prod.image : '',
        price: item.price,
        quantity: item.quantity,
      };
    });

    const newOrder = {
      _id: generateId(),
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice: itemsPrice || orderItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
      taxPrice: taxPrice || 0,
      shippingPrice: shippingPrice || 0,
      totalPrice: totalPrice || orderItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
      isPaid: false,
      isDelivered: false,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    memoryDB.orders.push(newOrder);
    // Clear cart
    cart.items = [];
    cart.updatedAt = new Date();

    res.status(201).json({ success: true, data: newOrder });
    return;
  }

  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error('Cart is empty');
  }

  const orderItems = cart.items.map((item) => ({
    product: item.product._id,
    name: item.product.name,
    image: item.product.image || item.product.images?.[0] || '',
    price: item.price,
    quantity: item.quantity,
  }));

  const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice: itemsPrice || orderItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
    taxPrice: taxPrice || 0,
    shippingPrice: shippingPrice || 0,
    totalPrice: totalPrice || orderItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
  });

  // Clear cart
  cart.items = [];
  await cart.save();

  res.status(201).json({ success: true, data: order });
});

// @desc    Get my orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  if (isMemoryMode()) {
    const orders = memoryDB.orders.filter((o) => o.user === req.user._id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, data: orders });
    return;
  }

  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, data: orders });
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  if (isMemoryMode()) {
    const order = memoryDB.orders.find((o) => o._id === req.params.id);
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }
    if (order.user !== req.user._id && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized to view this order');
    }
    res.json({ success: true, data: order });
    return;
  }

  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized');
  }

  res.json({ success: true, data: order });
});

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  if (isMemoryMode()) {
    const sorted = [...memoryDB.orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, data: sorted });
    return;
  }

  const orders = await Order.find({}).populate('user', 'id name email').sort({ createdAt: -1 });
  res.json({ success: true, data: orders });
});

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (isMemoryMode()) {
    const order = memoryDB.orders.find((o) => o._id === req.params.id);
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }
    order.status = status || order.status;
    if (status === 'delivered') {
      order.isDelivered = true;
      order.deliveredAt = new Date();
    }
    order.updatedAt = new Date();
    res.json({ success: true, data: order });
    return;
  }

  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.status = status || order.status;
  if (status === 'delivered') {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
  }

  const updated = await order.save();
  res.json({ success: true, data: updated });
});

module.exports = { createOrder, getMyOrders, getOrderById, getOrders, updateOrderStatus };
