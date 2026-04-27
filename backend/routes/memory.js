import express from "express";
import { 
  addMemory, 
  listMemory, 
  deleteMemory,
  updateMemory,
  deleteAllMemory
} from "../controllers/memoryController.js";

const router = express.Router();

// Create a memory
router.post("/", addMemory);

// List all memories
router.get("/", listMemory);

// Update a memory (NEW)
router.put("/:id", updateMemory);

// Delete ALL memories (NEW)
router.delete("/", deleteAllMemory);

// Delete a single memory
router.delete("/:id", deleteMemory);

export default router;
