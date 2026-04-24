import express from "express";
import cors from "cors";

// 1. Initialize database BEFORE anything else
import { initializeDatabase } from "./database/init.js";
initializeDatabase();

// 2. Create the Express app BEFORE using routes
const app = express();

// 3. Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" })); // allow attachments

// 4. Routes (AFTER app is created)
import conversationRoutes from "./routes/conversations.js";
app.use("/api/conversations", conversationRoutes);

import chatRoutes from "./routes/chat.js";
app.use("/api/chat", chatRoutes);

import attachmentRoutes from "./routes/attachments.js";
app.use("/api/attachments", attachmentRoutes);

import branchRoutes from "./routes/branches.js";
app.use("/api/branches", branchRoutes);

// 5. Static file serving
app.use("/attachments", express.static("storage/attachments"));

// 6. Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend API running on port ${PORT}`);
});
