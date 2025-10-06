import app from "./app.js";
import http from "http";
import connectDB from "./src/config/database.js";

const PORT = process.env.PORT || 5000;
// const HOST = process.env.HOST || "0.0.0.0";

async function startServer() {
  await connectDB();

  const server = http.createServer(app);
 
  server.listen(PORT, () => {
  console.log(`🚀 Server running at http://${PORT}`);
});

  // Graceful shutdown
  ["SIGINT","SIGTERM"].forEach(sig =>
    process.on(sig, () => {
      console.log(`${sig} received → shutting down`);
      server.close(() => process.exit(0));
    })
  );
}

startServer();
