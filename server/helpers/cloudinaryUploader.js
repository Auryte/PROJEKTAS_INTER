const cloudinary = require('../config/cloudinary.config');

const cloudinaryUploader = (uploadedImage, req) => {
  const result = cloudinary.v2.uploader.upload(uploadedImage.tempFilePath,
    {
      resource_type: 'image',
      folder: `Articles/${req.body.title}`,
      use_filename: true,
      unique_filename: false,
      overwrite: true
    },
    function (error, result) {
      if (error) {
        return;
      }
      return result;
    });
  return result;
};

module.exports = {
  cloudinaryUploader
};
