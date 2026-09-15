import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import authRoutes from "./routes/auth.js";
import apiRoutes from "./routes/api.js";

// Force Cloudflare DNS to avoid unreliable system resolvers (e.g. MongoDB Atlas SRV lookups)
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const app = express();
// Fall back to port 3000 when PORT is not set in the environment
const port = Number(process.env.PORT || 3000);

// Parse incoming JSON request bodies
app.use(express.json());
// Authentication endpoints (register, login, logout)
app.use("/auth", authRoutes);
// Protected application API (journeys, public transport, user settings)
app.use("/api", apiRoutes);

// Establish the MongoDB connection once at startup
mongoose
  .connect(encodeURI(process.env.MONGODB_URI))
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Health/info endpoint returning basic metadata about the server
app.get("/", (req, res) => {
  const serverInfo = {
    name: "Poly-Train Server",
    version: "1.0.0",
    description: "This is a sample server for the Poly-Train application.",
    developer: ["Adrian", "Erich", "Simon"],
  };

  res.send(serverInfo);
});

// Start listening for incoming HTTP requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
