import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./src/config/database.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });

    // Graceful shutdown
    ["SIGINT", "SIGTERM"].forEach((signal) => {
      process.on(signal, () => {
        console.log(`${signal} received. Shutting down...`);
        server.close(() => process.exit(0));
      });
    });
  } catch (error) {
    console.error(" Server failed to start:", error);
    process.exit(1);
  }
}

startServer();
