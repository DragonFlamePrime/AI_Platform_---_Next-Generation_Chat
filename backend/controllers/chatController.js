import db from "../database/db.js";
import crypto from "crypto";

export const handleChat = (req, res) => {
  const { message, conversationId, attachments = [] } = req.body;

  const validatedAttachments = attachments.map(att => ({
    id: att.id,
    filename: att.filename,
    storedFilename: att.storedFilename,
    size: att.size,
    url: att.url
  }));

  const timestamp = Date.now();

  // Save user message
  const userMsgId = crypto.randomBytes(8).toString("hex");
  db.prepare(`
    INSERT INTO messages (id, conversationId, role, message, attachments, timestamp)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    userMsgId,
    conversationId,
    "user",
    message,
    JSON.stringify(validatedAttachments),
    timestamp
  );

  // AI reply
  const aiReply = `AI response to: "${message}"`;
  const aiMsgId = crypto.randomBytes(8).toString("hex");

  db.prepare(`
    INSERT INTO messages (id, conversationId, role, message, attachments, timestamp)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    aiMsgId,
    conversationId,
    "ai",
    aiReply,
    "[]",
    Date.now()
  );

  res.json({
    conversationId,
    userMessage: message,
    aiMessage: aiReply,
    attachments: validatedAttachments,
    timestamp
  });
};
