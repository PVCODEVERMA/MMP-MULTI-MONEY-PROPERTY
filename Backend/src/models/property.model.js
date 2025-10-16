import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  userType: {
    type: String,
    enum: ["User", "Developer", "Builder", "Broker", "Channel-Partner"],
    required: true,
  },
  purpose: {
    type: String,
    enum: ["sell", "rent"],
    required: true,
  },
  category: {
    type: String,
    enum: ["residential", "commercial"],
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
  },
  bathrooms: {
    type: Number,
  },
  amenities: {
    type: [String],
    default: [],
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  floor: {
    type: String,
  },
  totalFloors: {
    type: String,
  },
  description: {
    type: String,
    trim: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  whatsappNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  availableFrom: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Property", propertySchema);
