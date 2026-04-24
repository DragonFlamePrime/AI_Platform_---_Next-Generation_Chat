import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" })); // allow attachments

// Chat route
import chatRoutes from "./routes/chat.js";
app.use("/api/chat", chatRoutes);

// Placeholder for future routes
import attachmentRoutes from "./routes/attachments.js";
app.use("/api/attachments", attachmentRoutes);

// Serve uploaded files
app.use("/attachments", express.static("storage/attachments"));

// app.use("/api/attachments", attachmentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend API running on port ${PORT}`);
});
