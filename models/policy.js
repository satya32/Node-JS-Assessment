const mongoose = require('mongoose');
const { stream } = require('xlsx');
// const { schema } = require('../agents/agents');

const policySchema = new mongoose.Schema({
  policyNumber: {
    type: String,
    required: false,
    unique: false,
  },
  policyMode: {
    type: Number,
    
  },
 policyType: {
    type: String,
    enum: ['Single', 'Multiple'],
    default: 'Single',
  },
  policyStartDate: {
    type: String,
   
  },
  policyEndDate: {
    type: String,
    
  },
  premiumAmount: {
    type: String,
   
  },
  premiumAmountWritten: {
    type: String,
   
  },
  status: {
    type: String,
   
  },
});

const Policy = mongoose.model('Policy', policySchema);
module.exports = Policy;