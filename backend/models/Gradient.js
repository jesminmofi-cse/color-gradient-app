const mongoose = require('mongoose');

const GradientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    default: 'Custom Gradient',
  },
  color1: {
    type: String,
    required: true,
  },
  color2: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Gradient', GradientSchema);
