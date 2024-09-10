const mongoose = require('mongoose');
const url = process.env.URI

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB'); 
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

module.exports = { connectDB };
