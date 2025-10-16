import express from "express";
import {
  createHighLead,
  getAllHighLeads,
  updateHighLead,
  deleteHighLead,
  assignHighLead,
} from "../../controllers/lead/HighLead.controller.js";

const router = express.Router();

// CRUD routes
router.post("/", createHighLead);       // Create
router.get("/", getAllHighLeads);       // Read all
router.put("/:id", updateHighLead);     // Update
router.delete("/:id", deleteHighLead);  // Delete

router.put("/:id/assign", assignHighLead);

export default router;
