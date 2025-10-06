import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import rateLimiter from "./src/config/rateLimiter.js";
import { globalErrorHandler, notFound } from "./src/middleware/errorHandler.js";

// Load .env
dotenv.config();
console.log(
  "Loaded environment:",
  process.env.MONGODB_URI ? "✅ Mongo URI loaded" : "❌ Missing Mongo URI"
);

// Import routes
import userRoutes from "./src/routes/auth/auth.routes.js";
import subAdminRoutes from "./src/routes/adminAuth/subAdmin.routes.js";
import superAdminRoutes from "./src/routes/adminAuth/superAdmin.routes.js";
// import paymentRoutes from "./src/routes/payment/paymentRoutes.js"; 

// Initialize app
const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(",") || [], credentials: true }));
app.use(rateLimiter);
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/subadmin", subAdminRoutes);
app.use("/api/superadmin", superAdminRoutes);
// app.use("/api/payment", paymentRoutes);

// Default route
app.get("/", (req, res) => res.send("API Running ✅"));

// Error handling
app.use(notFound);
app.use(globalErrorHandler);

export default app;
