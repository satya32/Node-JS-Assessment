// models/Agent.js
const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  agentName: {
    type: String,
    required:false,
  },
  agencyId: {
    type: String,
    required: false,
  },
});
const Agent = mongoose.model('Agent', agentSchema);
module.exports = Agent;

//  Agent, User, User's Account, LOB, Carrier, Policy