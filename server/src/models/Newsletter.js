const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email'],
    },
    isActive: { type: Boolean, default: true },
    source: { type: String, default: 'website' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Newsletter', newsletterSchema);
