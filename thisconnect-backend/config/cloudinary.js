const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');

dotenv.config();

console.log('🔐 Cloud Name:', process.env.CLOUDINARY_NAME);


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'thisconnect_posts',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

module.exports = { cloudinary, storage };
