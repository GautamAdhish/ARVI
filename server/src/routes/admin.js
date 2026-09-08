const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
const { isMemoryMode, getConnectionStatus } = require('../config/db');
const { memoryDB } = require('../utils/memoryStore');

router.use(protect, admin);

router.get('/stats', async (req, res) => {
  try {
    let stats = {};

    if (isMemoryMode()) {
      stats = {
        users: memoryDB.users.length,
        products: memoryDB.products.length,
        orders: memoryDB.orders.length,
        contacts: memoryDB.contacts.length,
        newsletters: memoryDB.newsletters.length,
        revenue: memoryDB.orders.reduce((acc, o) => acc + (o.totalPrice || 0), 0),
        pendingOrders: memoryDB.orders.filter((o) => o.status === 'pending').length,
        lowStock: memoryDB.products.filter((p) => p.stock < 10).length,
      };
    } else {
      const User = require('../models/User');
      const Product = require('../models/Product');
      const Order = require('../models/Order');
      const Contact = require('../models/Contact');
      const Newsletter = require('../models/Newsletter');

      const [users, products, orders, contacts, newsletters, revenueAgg, pendingOrders, lowStock] = await Promise.all([
        User.countDocuments(),
        Product.countDocuments(),
        Order.countDocuments(),
        Contact.countDocuments(),
        Newsletter.countDocuments(),
        Order.aggregate([{ $group: { _id: null, total: { $sum: '$totalPrice' } } }]),
        Order.countDocuments({ status: 'pending' }),
        Product.countDocuments({ stock: { $lt: 10 } }),
      ]);

      stats = {
        users,
        products,
        orders,
        contacts,
        newsletters,
        revenue: revenueAgg[0]?.total || 0,
        pendingOrders,
        lowStock,
      };
    }

    const connectionStatus = getConnectionStatus();

    res.json({
      success: true,
      data: {
        ...stats,
        mode: isMemoryMode() ? 'memory' : 'database',
        connectionStatus,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
