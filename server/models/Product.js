const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title:        { type: String, required: true },
    description:  { type: String, required: true },
    category:     { type: String, required: true },
    brand:        { type: String, required: true },
    price:        { type: Number, required: true },
    salePrice:    { type: Number, default: 0 },
    totalStock:   { type: Number, required: true },
    averageReview:{ type: Number, default: 0 },
    image:        { type: String, required: true }, // Cloudinary URL
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
