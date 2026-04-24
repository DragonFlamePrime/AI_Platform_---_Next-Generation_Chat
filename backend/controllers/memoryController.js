import db from "../database/db.js";
import crypto from "crypto";

export function addMemory(req, res) {
  const { fact } = req.body;

  if (!fact) {
    return res.status(400).json({ error: "fact is required." });
  }

  const id = crypto.randomBytes(8).toString("hex");
  const createdAt = Date.now();

  db.prepare(`
    INSERT INTO memory (id, fact, createdAt)
    VALUES (?, ?, ?)
  `).run(id, fact, createdAt);

  res.json({ id, fact, createdAt });
}

export function listMemory(req, res) {
  const memories = db.prepare(`
    SELECT * FROM memory ORDER BY createdAt ASC
  `).all();

  res.json(memories);
}

export function deleteMemory(req, res) {
  const { id } = req.params;

  const result = db.prepare(`
    DELETE FROM memory WHERE id = ?
  `).run(id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Memory not found." });
  }

  res.json({ success: true });
}
