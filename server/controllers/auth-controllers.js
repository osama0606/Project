// server/controllers/auth-controller.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ────────────────────────────────
// helper – generate JWT for a user
// ────────────────────────────────
const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

// ────────────────
// 1️⃣  REGISTER
// ────────────────
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // basic validation
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    // check duplicate email
    if (await User.findOne({ email }))
      return res.status(400).json({ message: "User already exists" });

    // create user (password hashed in pre‑save hook)
    const user = await User.create({ name, email, password, role: "admin" });

    // create token
    const token = generateToken(user);

    res.status(201).json({
      message: "Admin registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// ────────────────
// 2️⃣  LOGIN
// ────────────────
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find admin by email
    const user = await User.findOne({ email, role: "admin" });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Login failed" });
  }
};

// ────────────────
// 3️⃣  GET PROFILE
// ────────────────
exports.getUser = async (req, res) => {
  try {
    // req.user is set in auth middleware
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error("Profile error:", err.message);
    res.status(500).json({ message: "Error fetching user" });
  }
};
