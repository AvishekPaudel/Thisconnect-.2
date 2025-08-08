const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const Post = require('../models/PostModel');

// Middleware to check login
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

// GET: Logged-in user profile with their posts
router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 });

    res.status(200).json({ user, posts });
  } catch (err) {
    console.error('Error fetching profile:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
