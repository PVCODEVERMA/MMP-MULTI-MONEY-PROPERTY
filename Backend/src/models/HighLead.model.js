import mongoose from "mongoose";

const highLeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    whatsappNumber: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    propertyType: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "contacted", "sold"],
      default: "new",
      required: true,
    },
    reminder: { type: Date, required: true }, 
    bukitProperty: { type: String, required: true }, 
    assignedTo: { type: mongoose.Schema.Types.ObjectId, },
    assignedRole: { type: String, enum: ["Broker", "Channel-Partner", "Developer", "Builder"] },

  },

  { timestamps: true }
);

export default mongoose.model("HighLead", highLeadSchema);
