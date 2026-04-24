import express from "express";
import {
  createConversation,
  listConversations,
  loadConversation,
  deleteConversation
} from "../controllers/conversationController.js";

const router = express.Router();

router.post("/", createConversation);
router.get("/", listConversations);
router.get("/:id", loadConversation);
router.delete("/:id", deleteConversation);

export default router;
