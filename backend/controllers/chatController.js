import db from "../database/db.js";
import crypto from "crypto";
import openai from "../openai.js"; // adjust if your file name differs

// ---------------------------------------------------------
// GET /api/chat/:id  → Load conversation messages
// ---------------------------------------------------------
export const getChat = (req, res) => {
  const conversationId = req.params.id;

  const messages = db.prepare(
    `SELECT role, message AS content 
     FROM messages 
     WHERE conversationId = ? 
     ORDER BY timestamp ASC`
  ).all(conversationId);

  res.json({ messages });
};

// ---------------------------------------------------------
// POST /api/chat/:id  → Send a message + get AI response
// ---------------------------------------------------------
export const postChat = async (req, res) => {
  try {
    const conversationId = req.params.id;
    const { message } = req.body;

    const timestamp = Date.now();

    // 1. SAVE USER MESSAGE
    const userMsgId = crypto.randomBytes(8).toString("hex");

    db.prepare(`
      INSERT INTO messages (id, conversationId, role, message, attachments, timestamp)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      userMsgId,
      conversationId,
      "user",
      message,
      "[]",
      timestamp
    );

    // 2. GENERATE AI RESPONSE
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an AI assistant." },
        { role: "user", content: message }
      ]
    });

    const aiMessage = aiResponse.choices[0].message.content.trim();

    const aiMsgId = crypto.randomBytes(8).toString("hex");

    db.prepare(`
      INSERT INTO messages (id, conversationId, role, message, attachments, timestamp)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      aiMsgId,
      conversationId,
      "assistant",
      aiMessage,
      "[]",
      Date.now()
    );

    // 3. AUTO‑GENERATE TITLE IF NEEDED
    const convo = db.prepare(
      `SELECT * FROM conversations WHERE id = ?`
    ).get(conversationId);

    const firstMessages = db.prepare(
      `SELECT role, message FROM messages 
       WHERE conversationId = ? 
       ORDER BY timestamp ASC 
       LIMIT 3`
    ).all(conversationId);

    if (!convo.title) {
      const userMessages = firstMessages
        .filter(m => m.role === "user")
        .map(m => m.message);

      if (userMessages.length >= 2) {
        const titlePrompt = `
Summarize the following conversation into a short title (4–8 words).
Do NOT use quotes.

Messages:
${userMessages.join("\n")}
`;

        const titleResponse = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: titlePrompt }]
        });

        const generatedTitle = titleResponse.choices[0].message.content.trim();

        db.prepare(
          `UPDATE conversations SET title = ? WHERE id = ?`
        ).run(generatedTitle, conversationId);
      }
    }

    // 4. RETURN AI MESSAGE
    res.json({
      assistantMessage: {
        role: "assistant",
        content: aiMessage
      }
    });

  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Chat failed" });
  }
};
