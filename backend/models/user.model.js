const mongoose = require('mongoose');
const { modelConfig } = require('@/config');

const User = mongoose.model(
  'User',
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        select: false,
      },
      phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 15,
      },
      address: {
        type: String,
        required: true,
      },
      status: {
        type: Boolean,
        default: true,
      },
      role: {
        type: String,
        enum: ['Admin', 'Staff', 'Customer'],
        default: 'Customer',
      },
      profileImage: {
        type: String,
      },
    },
    modelConfig
  )
);

module.exports = User;
