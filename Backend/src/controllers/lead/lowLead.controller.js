import lowLead from "../../models/lowLead.js";



//  Create Low Lead
export const createLowLead = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: "Name and phone are required" });
    }

    const lead = await lowLead.create({ name, phone, email });
    res.status(201).json({ success: true, message: "Low Intent Lead created", lead });
  } catch (error) {
    console.error("Create Low Lead Error:", error);
    res.status(500).json({ success: false, message: "Server error while creating lead" });
  }
};

//  Get All Low Leads
export const getAllLowLeads = async (req, res) => {
  try {
    const leads = await lowLead.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, leads });
  } catch (error) {
    console.error("Get Low Leads Error:", error);
    res.status(500).json({ success: false, message: "Server error while fetching leads" });
  }
};

//  Update Low Lead
export const updateLowLead = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLead = await lowLead.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedLead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    res.status(200).json({ success: true, message: "Lead updated successfully", lead: updatedLead });
  } catch (error) {
    console.error("Update Low Lead Error:", error);
    res.status(500).json({ success: false, message: "Server error while updating lead" });
  }
};

//  Delete Low Lead
export const deleteLowLead = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLead = await lowLead.findByIdAndDelete(id);

    if (!deletedLead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    res.status(200).json({ success: true, message: "Lead deleted successfully" });
  } catch (error) {
    console.error("Delete Low Lead Error:", error);
    res.status(500).json({ success: false, message: "Server error while deleting lead" });
  }
};
