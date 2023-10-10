const mongoose = require('mongoose');
const User = require('./UserModel');
// Define the Todoo schema
const todooSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  inProgress: {
    type: Boolean,
    default: false,
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
