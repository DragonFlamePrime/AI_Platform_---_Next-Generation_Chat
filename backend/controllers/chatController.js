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

  // ---------------------------------------------------------
  // ⭐ 1. SAVE USER MESSAGE (unchanged)
  // ---------------------------------------------------------
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

  // --- Memory Detection (Improved) ---

// 1. Split into sentences
const sentences = message
  .split(/(?<=[.?!])\s+/)
  .map(s => s.trim())
  .filter(s => s.length > 0);

for (const sentence of sentences) {
  const lower = sentence.toLowerCase();

  // 2. Skip questions
  if (sentence.endsWith("?")) continue;

  // 3. Fact patterns
  const isFact =
    lower.startsWith("i am ") ||
    lower.startsWith("my name is ") ||
    lower.startsWith("i live in ") ||
    lower.includes(" is my favorite");

  if (!isFact) continue;

  // 4. Duplicate detection
  const existing = db.prepare(`
    SELECT id FROM memory WHERE fact = ?
  `).get(sentence);

  if (existing) continue; // skip duplicates

  // 5. Save memory
  const memId = crypto.randomBytes(8).toString("hex");
  const createdAt = Date.now();

  db.prepare(`
    INSERT INTO memory (id, fact, createdAt)
    VALUES (?, ?, ?)
  `).run(memId, sentence, createdAt);
}
  
  // ---------------------------------------------------------
  // ⭐ 3. LOAD ALL MEMORIES (Step 7)
  // ---------------------------------------------------------
  const memories = db.prepare(`
    SELECT fact FROM memory ORDER BY createdAt ASC
  `).all();

  const memoryContext = memories.length
    ? memories.map(m => `- ${m.fact}`).join("\n")
    : "(no memories stored yet)";

  // ---------------------------------------------------------
  // ⭐ 4. AI RESPONSE USING MEMORY (Step 7)
  // ---------------------------------------------------------
  const aiReply = `
Using what I remember:

${memoryContext}

Here is my response to your message: "${message}"
  `.trim();

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

  // ---------------------------------------------------------
  // ⭐ 5. RETURN RESPONSE (unchanged)
  // ---------------------------------------------------------
  res.json({
    conversationId,
    userMessage: message,
    aiMessage: aiReply,
    attachments: validatedAttachments,
    timestamp
  });
};
