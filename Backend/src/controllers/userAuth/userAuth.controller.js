import User from "../../models/user.model.js";
import { uploadToCloudinary } from "../../middleware/upload.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import crypto from "crypto";
import nodemailer from "nodemailer";


/* =============== Register User =============== */
export const registerUser = async (req, res, next) => {

  try {
    if (req.body.data) req.body = JSON.parse(req.body.data);

    const { fullName, email, phone, password, confirmPassword, city, role } = req.body;


    if (!fullName || !email || !phone || !password || !confirmPassword || !city) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    // Role assign (default: User)
    const allowedRoles = ["User", "Developer", "Builder", "Broker"];
    const assignedRole = allowedRoles.includes(role) ? role : "User";

    // Profile Image upload
    let profileImageUrl = "";
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "users");
      profileImageUrl = result.secure_url;
    }

    // User create
    const user = await User.create({
      fullName,
      email,
      phone,
      password,
      city,
      role: assignedRole,
      profileImage: profileImageUrl
    });

    const { password: _, ...userData } = user.toObject();
    res.status(201).json({ message: "User registered successfully", user: userData });

  } catch (err) {
    next(err);
  }
};

/* =============== Login =============== */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "strict",
      maxAge: parseInt(process.env.REFRESH_TOKEN_LIFETIME) * 1000,
    });

    const { password: _, ...userData } = user.toObject();
    res.status(200).json({ message: "Login successful", user: userData, accessToken });
  } catch (err) { next(err); }
};

/* =============== Logout =============== */
export const logoutUser = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: "strict",
    domain: process.env.COOKIE_DOMAIN,
  });
  res.status(200).json({ message: "Logged out successfully" });
};

/* =============== Get Profile =============== */
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (err) { next(err); }
};

/* =============== Update Profile =============== */
export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { fullName, phone, city } = req.body;
    if (fullName) user.fullName = fullName;
    if (phone) user.phone = phone;
    if (city) user.city = city;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "users");
      user.profileImage = result.secure_url;
    }

    await user.save();
    const { password, ...userData } = user.toObject();
    res.status(200).json({ message: "Profile updated", user: userData });
  } catch (err) { next(err); }
};

/* =============== Forgot Password =============== */
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
    await user.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.example.com",
      port: 587,
      auth: { user: "your_email@example.com", pass: "password" },
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await transporter.sendMail({
      from: `"Support" <support@example.com>`,
      to: user.email,
      subject: "Password Reset",
      text: `Reset here: ${resetUrl}`,
    });

    res.status(200).json({ message: "Password reset link sent" });
  } catch (err) { next(err); }
};

/* =============== Reset Password =============== */
export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) return res.status(400).json({ message: "Password required" });
    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" });

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({ resetPasswordToken: hashedToken, resetPasswordExpires: { $gt: Date.now() } });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) { next(err); }
};

// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // password hide
    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};