const asyncHandler = require('express-async-handler');
const Contact = require('../models/Contact');
const { isMemoryMode } = require('../config/db');
const { memoryDB, generateId } = require('../utils/memoryStore');

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, countryCode, subject, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error('Name, email and message are required');
  }

  if (isMemoryMode()) {
    const newContact = {
      _id: generateId(),
      name,
      email: email.toLowerCase(),
      phone: phone || '',
      countryCode: countryCode || '+91',
      subject: subject || 'General Inquiry',
      message,
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryDB.contacts.push(newContact);
    res.status(201).json({ success: true, message: 'Message sent successfully! We will get back to you soon.', data: newContact });
    return;
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    countryCode,
    subject,
    message,
  });

  res.status(201).json({ success: true, message: 'Message sent successfully!', data: contact });
});

const getContacts = asyncHandler(async (req, res) => {
  if (isMemoryMode()) {
    const sorted = [...memoryDB.contacts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, data: sorted, count: sorted.length });
    return;
  }

  const contacts = await Contact.find({}).sort({ createdAt: -1 });
  res.json({ success: true, data: contacts, count: contacts.length });
});

const updateContactStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (isMemoryMode()) {
    const contact = memoryDB.contacts.find((c) => c._id === req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error('Contact message not found');
    }
    contact.status = status;
    contact.updatedAt = new Date();
    res.json({ success: true, data: contact });
    return;
  }

  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact message not found');
  }

  contact.status = status || contact.status;
  await contact.save();
  res.json({ success: true, data: contact });
});

module.exports = { createContact, getContacts, updateContactStatus };
