const router = require("express").Router();
const auth  = require("../middleware/auth");
const {
  uploadImage,
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/product-controllers");
const { upload } = require("../helpers/cloudinary");

// Image upload
router.post("/upload-image", auth, upload.single("my_file"), uploadImage);

// CRUD
router.post("/",  auth, addProduct);
router.get("/",   auth, getProducts);
router.put("/:id",auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;
