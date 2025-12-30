const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getAllUsers,
  updateUserRole,
  toggleBlockUser,
  deleteUser
} = require("../controllers/adminUserController");

router.get("/users", protect, adminOnly, getAllUsers);
router.put("/users/:id/role", protect, adminOnly, updateUserRole);
router.put("/users/:id/block", protect, adminOnly, toggleBlockUser);
router.delete("/users/:id", protect, adminOnly, deleteUser);

module.exports = router;
