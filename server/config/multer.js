const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'interDesign',
  allowedFormats: ['jpg', 'png'],
  transformation: [{
    width: 1200,
    height: 800,
    crop: 'limit'
  }]
});

module.exports = multer({ storage: storage });
