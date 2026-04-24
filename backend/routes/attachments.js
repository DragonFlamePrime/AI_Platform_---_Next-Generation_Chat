import express from "express";
import multer from "multer";
import path from "path";
import crypto from "crypto";

const router = express.Router();

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "storage/attachments");
  },
  filename: (req, file, cb) => {
    const id = crypto.randomBytes(8).toString("hex");
    const ext = path.extname(file.originalname);
    const filename = `${id}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({ storage });

// POST /api/attachments/upload
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const file = req.file;

  const response = {
    id: path.parse(file.filename).name,
    filename: file.originalname,
    storedFilename: file.filename,
    size: file.size,
    url: `/attachments/${file.filename}`
  };

  res.json(response);
});

export default router;
