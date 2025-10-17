import HighLead from "../../models/HighLead.model.js";
import User from "../../models/user.model.js";
// Create a High Intent Lead
export const createHighLead = async (req, res) => {
  try {
    const {
      name,
      phone,
      whatsappNumber,
      email,
      location,
      propertyType,
      status,
      reminder,
      bukitProperty,
    } = req.body;

    // Validate all fields
    if (
      !name ||
      !phone ||
      !whatsappNumber ||
      !email ||
      !location ||
      !propertyType ||
      !status ||
      !reminder ||
      !bukitProperty
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const lead = await HighLead.create(req.body);
    res.status(201).json({ message: "High Intent Lead created successfully", lead });
  } catch (err) {
    console.error("Error creating high lead:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

// Get all High Intent Leads
export const getAllHighLeads = async (req, res) => {
  try {
    const leads = await HighLead.find().sort({ createdAt: -1 });
    res.status(200).json({ leads });
  } catch (err) {
    console.error("Error fetching high leads:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

// Update a High Intent Lead
export const updateHighLead = async (req, res) => {
  try {
    const { id } = req.params;

    // Optional: You can validate fields here as well if you want to enforce all fields
    const updatedLead = await HighLead.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({ message: "Lead updated successfully", updatedLead });
  } catch (err) {
    console.error("Error updating high lead:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

// Delete a High Intent Lead
export const deleteHighLead = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLead = await HighLead.findByIdAndDelete(id);
    if (!deletedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (err) {
    console.error("Error deleting high lead:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

// ✅ Assign lead to Broker / Channel Partner / Developer / Builder
export const assignHighLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { assignedTo, assignedRole } = req.body;

    if (!assignedTo || !assignedRole) {
      return res.status(400).json({ message: "Assigned user and role required" });
    }

    const lead = await HighLead.findByIdAndUpdate(
      id,
      { assignedTo, assignedRole },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({ message: "Lead assigned successfully", lead });
  } catch (error) {
    console.error("Assign Lead Error:", error);
    res.status(500).json({ message: "Server error while assigning lead" });
  }
};


export const getLeadsByUser = async (req, res) => {
  try {
    const leads = await User.find({ userId: req.params.userId });
    if (leads.length === 0) {
      return res.json({ message: "No leads assigned yet", data: [] });
    }
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};