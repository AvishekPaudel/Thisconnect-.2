const Post = require('../models/postModel');
const cloudinary = require('../config/cloudinary')

exports.createPost = async (req, res) => {
  try {
    const { title, subtitle, genre } = req.body;

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
      }
    });

    await post.save();

    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    console.error('Error creating post:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};
