
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const { MONGODB_URI } = process.env;

console.log(' MONGODB_URI : ' , MONGODB_URI);
console.log('MongoDB URI:', process.env.MONGODB_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;