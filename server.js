const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Test route (so you can SEE backend in browser)
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
