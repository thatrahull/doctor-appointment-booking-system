import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoute.js";
import doctorRoutes from "./routes/doctorRoute.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoute.js";
import connectCloudinary from "./config/cloudinary.js";

dotenv.config();

const app = express();

// ✅ Initialize Cloudinary
connectCloudinary();

// ✅ Allowed origins for frontend
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://medigo-rgoc.onrender.com" // frontend Render URL
];

// ✅ CORS middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.use("/api/user", userRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
