const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }]
}, { timestamps: true }); 

userSchema.index({ email: 1});

module.exports = mongoose.model('Users', userSchema);
