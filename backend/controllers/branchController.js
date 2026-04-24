import db from "../database/db.js";
import crypto from "crypto";

export function branchConversation(req, res) {
  const { conversationId, messageId } = req.body;

  if (!conversationId || !messageId) {
    return res.status(400).json({ error: "conversationId and messageId are required." });
  }

  // Load original conversation
  const original = db.prepare(`
    SELECT * FROM conversations WHERE id = ?
  `).get(conversationId);

  if (!original) {
    return res.status(404).json({ error: "Original conversation not found." });
  }

  // Create new conversation
  const newId = crypto.randomBytes(8).toString("hex");
  const newTitle = `Branch of ${original.title}`;
  const createdAt = Date.now();

  db.prepare(`
    INSERT INTO conversations (id, title, createdAt)
    VALUES (?, ?, ?)
  `).run(newId, newTitle, createdAt);

  // Copy messages up to the branch point
  const messages = db.prepare(`
    SELECT * FROM messages
    WHERE conversationId = ?
    ORDER BY timestamp ASC
  `).all(conversationId);

  let reached = false;

  for (const msg of messages) {
    // Copy message
    const newMsgId = crypto.randomBytes(8).toString("hex");

    db.prepare(`
      INSERT INTO messages (id, conversationId, role, message, attachments, timestamp)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      newMsgId,
      newId,
      msg.role,
      msg.message,
      msg.attachments,
      msg.timestamp
    );

    if (msg.id === messageId) {
      reached = true;
      break;
    }
  }

  if (!reached) {
    return res.status(400).json({ error: "Message ID not found in conversation." });
  }

  res.json({
    newConversationId: newId,
    title: newTitle,
    createdAt
  });
}
