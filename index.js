// index.js
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');

const connectDB = require('./config/db');
const models = require('./models');
const app = express();
const PORT = 3000;


console.log('MongoDB URI:', process.env.MONGODB_URI);

// dotenv.config();
app.use(express.json());

// Import the data routes
const dataRoutes = require('./routes/dataRoutes');
//  db connections : 
connectDB();
// Use the data routes with a base path '/api/data'
app.use('/api/', dataRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
