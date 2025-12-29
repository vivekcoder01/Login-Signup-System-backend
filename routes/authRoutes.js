const express = require("express");
const router = express.Router();

// Controllers
const { registerUser, loginUser } = require("../controllers/authController");

// Middleware
const protect = require("../middleware/authMiddleware");

// =======================
// AUTH ROUTES
// =======================

// Register (Signup)
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Profile (Protected)
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
