const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getOrderById, getOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

router.use(protect);

router.route('/').post(createOrder).get(admin, getOrders);
router.get('/myorders', getMyOrders);
router.route('/:id').get(getOrderById);
router.put('/:id/status', admin, updateOrderStatus);

module.exports = router;
