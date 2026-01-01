import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  profileImage: { type: String, default: "" },
  role: {
    type: String,
    enum: ["User", "Developer", "Builder", "Broker", "Channel-Partner"],
    default: "User",
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,

  // ADDITIONAL FIELDS
  selectedPlan: { type: String, default: "" },
  addOns: { type: [Object], default: [] },
  dashboardAccess: { type: Boolean, default: false },
}, { timestamps: true });

// Hash password before save
userSchema.pre("save", async function() {
  if (!this.isModified("password")) return;
  const salt = Number(process.env.BCRYPT_ROUNDS) || 10;
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
