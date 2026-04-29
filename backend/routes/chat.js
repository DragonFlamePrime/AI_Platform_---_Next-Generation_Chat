import express from "express";
import { getChat, postChat } from "../controllers/chatController.js";

const router = express.Router();

router.get("/:id", getChat);
router.post("/:id", postChat);

export default router;
