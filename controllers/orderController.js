const Order = require("../models/Order");

// USER: CREATE ORDER
exports.createOrder = async (req, res) => {
  const { orderItems, totalAmount } = req.body;

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    totalAmount
  });

  res.status(201).json(order);
};

// USER: GET MY ORDERS
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

// ADMIN: GET ALL ORDERS
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "name email");
  res.json(orders);
};

// ADMIN: UPDATE ORDER STATUS
exports.updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  order.status = req.body.status;
  await order.save();
  res.json(order);
};
