const express = require("express");
const router = express.Router();

/* ===================== MIDDLEWARE ===================== */
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

/* ===================== CONTROLLERS ===================== */
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/adminController");

/* ===================== ADMIN ROUTES ===================== */

// Admin Dashboard
router.get("/dashboard", protect, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin",
    admin: req.user.name,
  });
});

// ===================== PRODUCT CRUD (ADMIN ONLY) =====================

// Create product
router.post("/products", protect, adminOnly, createProduct);

// Get all products
router.get("/products", protect, adminOnly, getProducts);

// Update product
router.put("/products/:id", protect, adminOnly, updateProduct);

// Delete product
router.delete("/products/:id", protect, adminOnly, deleteProduct);

module.exports = router;
