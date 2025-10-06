import mongoose from "mongoose";
import bcrypt from "bcrypt";

const subAdminSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true }, 
  password: { type: String, required: true },
  department: { type: String, required: true },
  profileImage: { type: String, default: "" },
  role: { type: String, enum: ["SubAdmin"], default: "SubAdmin" }
}, { timestamps: true });

subAdminSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, Number(process.env.BCRYPT_ROUNDS) || 10);
  next();
});

// Compare password method
subAdminSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


export default mongoose.model("SubAdmin", subAdminSchema);
