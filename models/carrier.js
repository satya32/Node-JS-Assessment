// models/Agent.js
const mongoose = require('mongoose');

const carrierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  // Add other properties specific to the Carrier schema
});
const Carrier = mongoose.model('Carrier', carrierSchema);
module.exports = Carrier;

//  Agent, User, User's Account, LOB, Carrier, Policy