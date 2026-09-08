const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const config = require('../config/config');
const User = require('../models/User');
const { isMemoryMode } = require('../config/db');
const { memoryDB } = require('../utils/memoryStore');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    if (isMemoryMode()) {
      const user = memoryDB.users.find((u) => u._id.toString() === decoded.id);
      if (!user) {
        res.status(401);
        throw new Error('User not found');
      }
      req.user = user;
    } else {
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        res.status(401);
        throw new Error('User not found');
      }
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});

const optionalAuth = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      if (isMemoryMode()) {
        req.user = memoryDB.users.find((u) => u._id.toString() === decoded.id) || null;
      } else {
        req.user = await User.findById(decoded.id).select('-password');
      }
    } catch {
      req.user = null;
    }
  }
  next();
});

module.exports = { protect, optionalAuth };
