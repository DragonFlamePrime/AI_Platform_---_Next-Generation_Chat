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

  // ---------------------------------------------------------
  // ⭐ 2. AUTO‑MEMORY DETECTION (Step 7)
  // ---------------------------------------------------------
  const lower = message.toLowerCase();

  if (
    lower.startsWith("i am ") ||
    lower.startsWith("my name is ") ||
    lower.startsWith("i live in ") ||
    lower.includes(" is my favorite")
  ) {
    const memId = crypto.randomBytes(8).toString("hex");
    const createdAt = Date.now();

    db.prepare(`
      INSERT INTO memory (id, fact, createdAt)
      VALUES (?, ?, ?)
    `).run(memId, message, createdAt);
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
