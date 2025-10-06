import SubAdmin from "../../models/subAdmin.model.js";
import { uploadToCloudinary } from "../../middleware/upload.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/token.js";

/* ================= Register ================= */
export const registerSubAdmin = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      password,
      confirmPassword,
      department,
      inviteSecretKey,
    } = req.body;

    if (inviteSecretKey == process.env.ADMIN_INVITE_SECRET) {
      return res.status(403).json({ message: "Invalid Invite Secret Key" });
    }

    console.log("ENV SECRET:", process.env.ADMIN_INVITE_SECRET);
    console.log("REQ SECRET:", inviteSecretKey);

    if (!fullName || !email || !password || !confirmPassword || !department) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existing = await SubAdmin.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    let profileImage = "";
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "subAdmins");
      profileImage = result.secure_url;
    }

    const subAdmin = await SubAdmin.create({
      fullName,
      email,
      phone,
      password,
      department,
      profileImage,
    });

    res
      .status(201)
      .json({ message: "SubAdmin registered successfully", subAdmin });
  } catch (error) {
    console.error("Register SubAdmin Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ================= Login ================= */
export const loginSubAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and Password required" });

    const subAdmin = await SubAdmin.findOne({ email });
    if (!subAdmin || !(await subAdmin.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(subAdmin);
    const refreshToken = generateRefreshToken(subAdmin);



    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "strict",
      maxAge: parseInt(process.env.REFRESH_TOKEN_LIFETIME) * 1000,
    });

    res
      .status(200)
      .json({ message: "Login successful", subAdmin, accessToken });
  } catch (error) {
    console.error("Login SubAdmin Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ================= Logout ================= */
export const logoutSubAdmin = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: "strict",
    domain: process.env.COOKIE_DOMAIN,
  });
  res.status(200).json({ message: "Logged out successfully" });
};

/* ================= Get Profile ================= */
export const getSubAdminProfile = async (req, res) => {
  try {
    const subAdmin = await SubAdmin.findById(req.user.id).select("-password");
    if (!subAdmin)
      return res.status(404).json({ message: "SubAdmin not found" });
    res.status(200).json({ subAdmin });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ================= Update Profile ================= */
export const updateSubAdminProfile = async (req, res) => {
  try {
    const subAdmin = await SubAdmin.findById(req.user.id);
    if (!subAdmin)
      return res.status(404).json({ message: "SubAdmin not found" });

    const { fullName, phone, department } = req.body;
    if (fullName) subAdmin.fullName = fullName;
    if (phone) subAdmin.phone = phone;
    if (department) subAdmin.department = department;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "subAdmins");
      subAdmin.profileImage = result.secure_url;
    }

    await subAdmin.save();
    res.status(200).json({ message: "Profile updated", subAdmin });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
