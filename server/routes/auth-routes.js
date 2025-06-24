// server/routes/auth-routes.js
const express = require("express");
const { register, login, getUser } = require("../controllers/auth-controllers");
const authMiddleware = require("../middleware/auth.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getUser); // ✅ add this

module.exports = router;
