import db from "./db.js";

export function initializeDatabase() {
  // Conversations table
  db.prepare(`
    CREATE TABLE IF NOT EXISTS conversations (
      id TEXT PRIMARY KEY,
      title TEXT,
      createdAt INTEGER
    )
  `).run();

  // Messages table
  db.prepare(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      conversationId TEXT,
      role TEXT,
      message TEXT,
      attachments TEXT, -- JSON string
      timestamp INTEGER,
      FOREIGN KEY (conversationId) REFERENCES conversations(id) ON DELETE CASCADE
    )
  `).run();
}
