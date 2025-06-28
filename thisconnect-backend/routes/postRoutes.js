const express = require('express');
const router = express.Router();
const multer = require('multer');
const { cloudinary, storage }= require('../config/cloudinary')
const Post = require('../models/postModel');

const upload = multer({storage});

// POST /api/posts
router.post('/', upload.single('image'), async (req, res) => {
  try {

    console.log('📝 req.body:', req.body);
    console.log('📦 req.file:', req.file);

    const { title, subtitle, genre } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    //  // Convert buffer to base64
    // const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    // // Upload to Cloudinary
    // const result = await cloudinary.uploader.upload(base64Image, {
    //   folder: 'thisconnect_posts'
    // });

    const post = new Post({
      title,
      subtitle,
      genre,
      image: {
        url: req.file.path,
        public_id: req.file.filename
      }
    });

    await post.save();

    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    console.error('Error creating post:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
