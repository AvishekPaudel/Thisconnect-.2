const express = require('express');
const router = express.Router();
const multer = require('multer');
const { cloudinary, storage }= require('../config/cloudinary')
const Post = require('../models/postModel');
const User = require('../models/UserModel');

const upload = multer({storage});

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) return next();
  return res.status(401).json({ error: 'Unauthorized' });
};

// POST /api/posts
router.post('/', upload.single('image'), async (req, res) => {
  try {

    console.log('📝 req.body:', req.body);
    console.log('📦 req.file:', req.file);

    const { title, subtitle, genre } = req.body;
    const userId = req.session.userId;

    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const post = new Post({
      title,
      subtitle,
      genre,
      image: {
        url: req.file.path,
        public_id: req.file.filename
      },
      user: userId
    });

    await post.save();

    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    console.error('Error creating post:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//get posts for cards
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('user');  
    console.log(posts)
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// ✅ GET /api/posts/profile - Get current logged-in user profile
router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get posts by genre
router.get('/genre/:genreName', async (req, res) => {
  try {
    const genreName = req.params.genreName;

    const genrePosts = await Post.find({ genre: new RegExp(`^${genreName}$`, 'i') })
      .sort({ createdAt: -1 })
      .populate('user');

    // If genre is 'All', return all posts
    if (genreName.toLowerCase() === 'all') {
      const posts = await Post.find().sort({ createdAt: -1 }).populate('user');
      return res.status(200).json(posts);
    }

    // Otherwise filter by genre
    const posts = await Post.find({ genre: genreName }).sort({ createdAt: -1 }).populate('user');
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching posts by genre:', err);
    res.status(500).json({ error: 'Failed to fetch posts by genre' });
  }
});


router.get('/profile/posts', async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user posts' });
  }
});
router.post('/:postId/like/toggle', async (req, res) => {
  try {
    const userId = req.session.userId; 
    const { postId } = req.params;
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json({
      liked: !alreadyLiked,
      likesCount: post.likes.length,
    });

  } catch (err) {
    console.error("Error toggling like:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
