import db from "../database/db.js";
import crypto from "crypto";

// Create a new conversation
export function createConversation(req, res) {
  const id = crypto.randomBytes(8).toString("hex");
  const title = req.body.title || "New Conversation";
  const createdAt = Date.now();

  db.prepare(`
    INSERT INTO conversations (id, title, createdAt)
    VALUES (?, ?, ?)
  `).run(id, title, createdAt);

  res.json({ id, title, createdAt });
}

// List all conversations
export function listConversations(req, res) {
  const rows = db.prepare(`
    SELECT * FROM conversations ORDER BY createdAt DESC
  `).all();

  res.json(rows);
}

// Load a conversation with messages
export function loadConversation(req, res) {
  const { id } = req.params;

  const convo = db.prepare(`
    SELECT * FROM conversations WHERE id = ?
  `).get(id);

  if (!convo) {
    return res.status(404).json({ error: "Conversation not found" });
  }

  const messages = db.prepare(`
    SELECT * FROM messages WHERE conversationId = ? ORDER BY timestamp ASC
  `).all(id);

  // Parse attachments JSON
  messages.forEach(msg => {
    msg.attachments = JSON.parse(msg.attachments || "[]");
  });

  res.json({ ...convo, messages });
}

// Delete a conversation
export function deleteConversation(req, res) {
  const { id } = req.params;

  db.prepare(`DELETE FROM conversations WHERE id = ?`).run(id);

  res.json({ success: true });
}
