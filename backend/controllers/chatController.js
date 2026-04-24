export async function handleChat(req, res) {
  try {
    const { message, conversationId, attachments } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required." });
    }

    // Placeholder AI logic (replace with real model later)
    const aiReply = `AI response to: "${message}"`;

    const response = {
      conversationId: conversationId || "temp-id",
      userMessage: message,
      aiMessage: aiReply,
      attachments: attachments || [],
      timestamp: Date.now()
    };

    res.json(response);

  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
}
