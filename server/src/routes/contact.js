const express = require('express');
const router = express.Router();
const { createContact, getContacts, updateContactStatus } = require('../controllers/contactController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

router.post('/', createContact);
router.get('/', protect, admin, getContacts);
router.put('/:id', protect, admin, updateContactStatus);

module.exports = router;
