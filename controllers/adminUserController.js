const User = require("../models/User");

// GET all users
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// UPDATE role (user/admin)
exports.updateUserRole = async (req, res) => {
  const { role } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  ).select("-password");
  res.json(user);
};

// BLOCK / UNBLOCK user
exports.toggleBlockUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  user.isBlocked = !user.isBlocked;
  await user.save();
  res.json({ message: "User block status updated", user });
};

// DELETE user
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};
