import express from "express";
import { addMemory, listMemory, deleteMemory } from "../controllers/memoryController.js";

const router = express.Router();

router.post("/", addMemory);
router.get("/", listMemory);
router.delete("/:id", deleteMemory);

export default router;
