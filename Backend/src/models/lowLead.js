import mongoose from "mongoose";

const lowLeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    location: { type: String },
    propertyType: { type: String },
    status: {
      type: String,
      enum: ["new", "contacted", "sold"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model("LowLead", lowLeadSchema);
