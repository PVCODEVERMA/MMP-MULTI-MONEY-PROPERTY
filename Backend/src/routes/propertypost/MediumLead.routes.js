import express from "express";
import {
  createMediumLead,
  getMediumLeads,
  getMediumLeadById,
  updateMediumLead,
  deleteMediumLead,
} from "../../controllers/lead/MediumLead.controller.js";

const router = express.Router();

// CRUD routes
router.post("/", createMediumLead);           // Create
router.get("/", getMediumLeads);             // Read all
router.get("/:id", getMediumLeadById);       // Read single
router.put("/:id", updateMediumLead);        // Update
router.delete("/:id", deleteMediumLead);     // Delete


export default router;
