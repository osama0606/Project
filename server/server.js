const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
require("dotenv").config();

const authRoutes     = require("./routes/auth-routes");
const productsRoutes = require("./routes/product-routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth",     authRoutes);
app.use("/api/products", productsRoutes);

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URL, { })
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);               // Exit if DB fails
  });
