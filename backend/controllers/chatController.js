export async function handleChat(req, res) {
  const { message } = req.body;

  // Placeholder logic
  res.json({
    reply: `You said: ${message}`
  });
}
