const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { isMemoryMode } = require('../config/db');
const { memoryDB, generateId } = require('../utils/memoryStore');
const bcrypt = require('bcryptjs');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide name, email and password');
  }

  if (isMemoryMode()) {
    const exists = memoryDB.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      res.status(400);
      throw new Error('User already exists');
    }
    const hashed = await bcrypt.hash(password, 10);
    const newUser = {
      _id: generateId(),
      name,
      email: email.toLowerCase(),
      password: hashed,
      role: 'user',
      avatar: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryDB.users.push(newUser);
    res.status(201).json({
      success: true,
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        token: generateToken(newUser._id, newUser.role),
      },
    });
    return;
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  if (isMemoryMode()) {
    const user = memoryDB.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      res.status(401);
      throw new Error('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new Error('Invalid credentials');
    }
    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      },
    });
    return;
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  res.json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    },
  });
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  if (isMemoryMode()) {
    const user = memoryDB.users.find((u) => u._id === req.user._id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    const { password, ...safeUser } = user;
    res.json({ success: true, data: safeUser });
    return;
  }

  const user = await User.findById(req.user._id);
  res.json({ success: true, data: user });
});

// @desc    Update profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, address } = req.body;

  if (isMemoryMode()) {
    const userIndex = memoryDB.users.findIndex((u) => u._id === req.user._id);
    if (userIndex === -1) {
      res.status(404);
      throw new Error('User not found');
    }
    if (name) memoryDB.users[userIndex].name = name;
    if (phone) memoryDB.users[userIndex].phone = phone;
    if (address) memoryDB.users[userIndex].address = address;
    memoryDB.users[userIndex].updatedAt = new Date();
    const { password, ...safe } = memoryDB.users[userIndex];
    res.json({ success: true, data: safe });
    return;
  }

  const user = await User.findById(req.user._id);
  if (user) {
    user.name = name || user.name;
    user.phone = phone || user.phone;
    if (address) user.address = address;
    const updated = await user.save();
    res.json({ success: true, data: updated });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = { register, login, getMe, updateProfile };
