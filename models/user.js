// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: 
  { 
    type: String, 
    required: false
   },
  userType: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  
  phone: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  dateOfBirth: {
    type: String,
    required: false,
  },
  zipCode: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    // enum: ['Male', 'Female', 'Other'],
  },
  status: {
    type: String,
    // enum: ['Male', 'Female', 'Other'],
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
