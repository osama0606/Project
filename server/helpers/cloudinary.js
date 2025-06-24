const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload  = multer({ storage });

const imageUploadUtil = async (base64) =>
  await cloudinary.uploader.upload(base64, { resource_type: "auto" });

module.exports = { upload, imageUploadUtil };
