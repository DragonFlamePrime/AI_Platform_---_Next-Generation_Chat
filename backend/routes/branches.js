import express from "express";
import { branchConversation } from "../controllers/branchController.js";

const router = express.Router();

router.post("/", branchConversation);

export default router;
