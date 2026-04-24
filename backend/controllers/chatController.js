export const handleChat = (req, res) => {
  const { message, conversationId, attachments = [] } = req.body;

  // Validate attachments (full metadata)
  const validatedAttachments = attachments.map(att => ({
    id: att.id,
    filename: att.filename,
    storedFilename: att.storedFilename,
    size: att.size,
    url: att.url
  }));

  const response = {
    conversationId,
    userMessage: message,
    aiMessage: `AI response to: "${message}"`,
    attachments: validatedAttachments,
    timestamp: Date.now()
  };

  res.json(response);
};
