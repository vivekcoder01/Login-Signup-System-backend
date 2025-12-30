// =======================
// IMPORTS
// =======================
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// =======================
// CONFIG
// =======================
dotenv.config();
connectDB();

// =======================
// APP INIT
// =======================
const app = express();

// =======================
// WEBHOOK (RAW BODY) – MUST BE BEFORE express.json()
// =======================
app.use(
  "/api/webhook",
  express.raw({ type: "application/json" })
);

// =======================
// MIDDLEWARES
// =======================
app.use(
  cors({
    origin: "*", // change in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// JSON parser (after webhook)
app.use(express.json());

// =======================
// ROUTES
// =======================

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// Auth routes
app.use("/api/auth", require("./routes/authRoutes"));

// Admin routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/admin", require("./routes/adminUserRoutes"));

// Order routes
app.use("/api/orders", require("./routes/orderRoutes"));

// Payment routes (create order, verify payment, etc.)
app.use("/api/payment", require("./routes/paymentRoutes"));

// Razorpay webhook route
app.use("/api/webhook", require("./routes/webhookRoutes"));

// =======================
// SERVER START
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
