import express from "express";
import {
  createLowLead,
  getAllLowLeads,
  updateLowLead,
  deleteLowLead,
} from "../../controllers/lead/lowLead.controller.js";

const router = express.Router();


router.post("/", createLowLead);    // Create
router.get("/", getAllLowLeads);    // Read all
router.put("/:id", updateLowLead);  // Update
router.delete("/:id", deleteLowLead); // Delete

export default router;
