// models/Agent.js
const mongoose = require('mongoose');

const lobSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },

});

const LOB = mongoose.model('LOB', lobSchema);
module.exports = LOB;

//  Agent, User, User's Account, LOB, Carrier, Policy