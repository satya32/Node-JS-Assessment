// models/UserAccount.js
const mongoose = require('mongoose');

const userAccountSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  accountType: {
    type: String,
    enum: ['Personal', 'Business'],
    default: 'Personal',
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: String,
  },
  status: {
    type: String,
  },
  // Add other properties specific to the User's Account schema
});
const UserAccount = mongoose.model('UserAccount', userAccountSchema);
module.exports = UserAccount;
