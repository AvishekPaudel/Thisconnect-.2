const mongoose = require('mongoose');
const User = require('../models/UserModel')

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://avishekpaudel:DJHE21ooFlqoPjhk@avishek-0.au09edd.mongodb.net/?retryWrites=true&w=majority&appName=Avishek-0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
