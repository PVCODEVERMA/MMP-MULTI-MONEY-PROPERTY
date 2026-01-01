import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";

import rateLimiter from "./src/config/rateLimiter.js";
import { globalErrorHandler, notFound } from "./src/middleware/errorHandler.js";

// Routes
import userRoutes from "./src/routes/auth/auth.routes.js";
import subAdminRoutes from "./src/routes/adminAuth/subAdmin.routes.js";
import superAdminRoutes from "./src/routes/adminAuth/superAdmin.routes.js";
import leadsRouter from "./src/routes/lead/lead.routes.js";
import lowLeadRoutes from "./src/routes/propertypost/lowProperty.routes.js";
import mediumLeadRoutes from "./src/routes/propertypost/MediumLead.routes.js";
import highLeadRoutes from "./src/routes/propertypost/HighLead.routes.js";

dotenv.config();

const app = express();

// Security & core middleware
app.use(helmet());
app.use(rateLimiter);
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" })); 
app.use(cookieParser());

// CORS
const allowedOrigins = [
  ...(process.env.ALLOWED_ORIGINS?.split(",") || []),
  "http://localhost:3000",
  "http://localhost:3001",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (!allowedOrigins.includes(origin)) {
        return callback(new Error("Not allowed by CORS"), false);
      }
      callback(null, true);
    },
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/subadmin", subAdminRoutes);
app.use("/api/superadmin", superAdminRoutes);
app.use("/api/leads", leadsRouter);
app.use("/api/low", lowLeadRoutes);
app.use("/api/medium", mediumLeadRoutes);
app.use("/api/high", highLeadRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API Running Successfully");
});

// Error handling
app.use(notFound);
app.use(globalErrorHandler);

export default app;
