const crypto = require("crypto");
const Order = require("../models/Order");

exports.razorpayWebhook = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const signature = req.headers["x-razorpay-signature"];

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(req.body)
    .digest("hex");

  if (expectedSignature !== signature) {
    return res.status(400).json({ message: "Invalid signature" });
  }

  const event = JSON.parse(req.body.toString());

  // PAYMENT SUCCESS EVENT
  if (event.event === "payment.captured") {
    const receipt = event.payload.payment.entity.notes.orderId;

    const order = await Order.findById(receipt);
    if (order) {
      order.isPaid = true;
      order.paidAt = new Date();
      order.status = "Paid";
      await order.save();
    }
  }

  res.json({ status: "ok" });
};
