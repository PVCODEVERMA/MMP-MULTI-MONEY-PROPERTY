import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // 15 min
  max: process.env.RATE_LIMIT_MAX_REQUESTS || 100, // max requests per window
  message: "Too many requests, please try again later.",
});

export default rateLimiter;
