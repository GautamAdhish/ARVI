const asyncHandler = require('express-async-handler');
const Newsletter = require('../models/Newsletter');
const { isMemoryMode } = require('../config/db');
const { memoryDB, generateId } = require('../utils/memoryStore');

const subscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error('Email is required');
  }

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error('Please provide a valid email');
  }

  if (isMemoryMode()) {
    const exists = memoryDB.newsletters.find((n) => n.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      if (!exists.isActive) {
        exists.isActive = true;
        exists.updatedAt = new Date();
        return res.json({ success: true, message: 'Welcome back! You have been resubscribed.', data: exists });
      }
      res.status(400);
      throw new Error('Email already subscribed');
    }
    const newSub = {
      _id: generateId(),
      email: email.toLowerCase(),
      isActive: true,
      source: 'website',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryDB.newsletters.push(newSub);
    res.status(201).json({ success: true, message: 'Successfully subscribed to newsletter!', data: newSub });
    return;
  }

  const exists = await Newsletter.findOne({ email: email.toLowerCase() });
  if (exists) {
    if (!exists.isActive) {
      exists.isActive = true;
      await exists.save();
      return res.json({ success: true, message: 'Welcome back! You have been resubscribed.', data: exists });
    }
    res.status(400);
    throw new Error('Email already subscribed');
  }

  const subscription = await Newsletter.create({ email: email.toLowerCase() });
  res.status(201).json({ success: true, message: 'Successfully subscribed!', data: subscription });
});

const getSubscribers = asyncHandler(async (req, res) => {
  if (isMemoryMode()) {
    res.json({ success: true, data: memoryDB.newsletters, count: memoryDB.newsletters.length });
    return;
  }

  const subscribers = await Newsletter.find({}).sort({ createdAt: -1 });
  res.json({ success: true, data: subscribers, count: subscribers.length });
});

const unsubscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (isMemoryMode()) {
    const sub = memoryDB.newsletters.find((n) => n.email.toLowerCase() === email.toLowerCase());
    if (!sub) {
      res.status(404);
      throw new Error('Subscription not found');
    }
    sub.isActive = false;
    sub.updatedAt = new Date();
    res.json({ success: true, message: 'Unsubscribed successfully' });
    return;
  }

  const sub = await Newsletter.findOne({ email: email.toLowerCase() });
  if (!sub) {
    res.status(404);
    throw new Error('Subscription not found');
  }
  sub.isActive = false;
  await sub.save();
  res.json({ success: true, message: 'Unsubscribed successfully' });
});

module.exports = { subscribe, getSubscribers, unsubscribe };
