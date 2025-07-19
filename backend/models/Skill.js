const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skill: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['teach', 'learn'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate skills for the same user
skillSchema.index({ user: 1, skill: 1, type: 1 }, { unique: true });

module.exports = mongoose.model('Skill', skillSchema); 