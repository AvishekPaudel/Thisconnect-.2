
const dotenv = require("dotenv")
const mongoose = require('mongoose');
const User = require('../models/UserModel')
const {Friend,Message} = require('../models/FollowerModel')

dotenv.config()


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.error('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
