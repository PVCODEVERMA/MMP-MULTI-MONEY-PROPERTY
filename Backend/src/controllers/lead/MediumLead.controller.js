
import asyncHandler from "express-async-handler";
import MediumLeadModel from "../../models/MediumLead.model";

// Create a new Medium Lead
export const createMediumLead = asyncHandler(async (req, res) => {
  const { name, phone, email, propertyType, status } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: "Name and phone are required" });
  }

  const lead = await MediumLeadModel.create({ name, phone, email, propertyType, status });
  res.status(201).json(lead);
});

// Get all Medium Leads
export const getMediumLeads = asyncHandler(async (req, res) => {
  const leads = await MediumLeadModel.find().sort({ createdAt: -1 });
  res.json(leads);
});

// Get single Medium Lead by ID
export const getMediumLeadById = asyncHandler(async (req, res) => {
  const lead = await MediumLeadModel.findById(req.params.id);
  if (!lead) {
    return res.status(404).json({ message: "Lead not found" });
  }
  res.json(lead);
});

// Update Medium Lead by ID
export const updateMediumLead = asyncHandler(async (req, res) => {
  const lead = await MediumLeadModel.findById(req.params.id);
  if (!lead) {
    return res.status(404).json({ message: "Lead not found" });
  }

  const { name, phone, email, propertyType, status } = req.body;

  lead.name = name || lead.name;
  lead.phone = phone || lead.phone;
  lead.email = email || lead.email;
  lead.propertyType = propertyType || lead.propertyType;
  lead.status = status || lead.status;

  const updatedLead = await lead.save();
  res.json(updatedLead);
});

// Delete Medium Lead by ID
export const deleteMediumLead = asyncHandler(async (req, res) => {
  const lead = await MediumLeadModel.findById(req.params.id);
  if (!lead) {
    return res.status(404).json({ message: "Lead not found" });
  }
  await lead.remove();
  res.json({ message: "Lead deleted successfully" });
});
