// server/controllers/productController.js
const Product = require("../models/Product");
const { imageUploadUtil } = require("../helpers/cloudinary");

/* ─────────────────────────────────────────────
   1. Upload product image to Cloudinary
────────────────────────────────────────────── */
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
      "base64"
    )}`;

    const result = await imageUploadUtil(base64);

    res.json({ url: result.secure_url });
  } catch (err) {
    console.error("Image upload error:", err.message);
    res.status(500).json({ message: "Upload error" });
  }
};

/* ─────────────────────────────────────────────
   2. Create a new product
────────────────────────────────────────────── */
exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.error("Create error:", err.message);
    res.status(400).json({ message: "Create error" });
  }
};

/* ─────────────────────────────────────────────
   3. Get products (search, sort, pagination)
────────────────────────────────────────────── */
exports.getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 5,
      search = "",
      sort = "",
    } = req.query;

    // Search by title (case‑insensitive)
    const query = search
      ? { title: { $regex: search, $options: "i" } }
      : {};

    // Sorting
    const sortOptions = {
      priceAsc:  { price:  1 },
      priceDesc: { price: -1 },
      titleAsc:  { title:  1 },
      titleDesc: { title: -1 },
    }[sort] || {}; // default: no sort

    // Pagination math
    const skip = (page - 1) * limit;

    // Execute queries in parallel
    const [products, totalCount] = await Promise.all([
      Product.find(query).sort(sortOptions).skip(skip).limit(Number(limit)),
      Product.countDocuments(query),
    ]);

    res.json({
      products,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

/* ─────────────────────────────────────────────
   4. Update an existing product
────────────────────────────────────────────── */
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Not found" });

    res.json(updated);
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ message: "Update error" });
  }
};

/* ─────────────────────────────────────────────
   5. Delete a product
────────────────────────────────────────────── */
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Not found" });

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ message: "Delete error" });
  }
};
