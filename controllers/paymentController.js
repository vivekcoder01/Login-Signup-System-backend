const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

// CREATE RAZORPAY ORDER
exports.createRazorpayOrder = async (req, res) => {
  const { amount, orderId } = req.body;

  const options = {
    amount: amount * 100, // ₹ → paise
    currency: "INR",
    receipt: orderId
  };

  const rpOrder = await razorpay.orders.create(options);
  res.json(rpOrder);
};

// VERIFY PAYMENT
exports.verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    localOrderId
  } = req.body;

  const body =
    razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    const order = await Order.findById(localOrderId);
    order.isPaid = true;
    order.paidAt = new Date();
    order.status = "Paid";
    await order.save();

    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
};
