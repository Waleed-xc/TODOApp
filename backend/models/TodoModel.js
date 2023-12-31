const mongoose = require('mongoose');
const User = require('./UserModel');
// Define the Todoo schema
const todooSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
});

// Create the Todoo model
const Todoo = mongoose.model('Todoo', todooSchema);

module.exports = Todoo;
