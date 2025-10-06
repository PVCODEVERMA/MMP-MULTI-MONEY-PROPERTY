import SuperAdmin from "../../models/superAdmin.model.js";
import { uploadToCloudinary } from "../../middleware/upload.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/token.js";

/* ================= Register ================= */
export const registerSuperAdmin = async (req, res) => {
  try {
    const { fullName, email, phone, password, confirmPassword, superSecretKey } = req.body;

    if (superSecretKey !== process.env.SUPER_ADMIN_SECRET) {
      return res.status(403).json({ message: "Invalid Super Admin Secret Key" });
    }

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existing = await SuperAdmin.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    let profileImage = "";
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "superAdmins");
      profileImage = result.secure_url;
    }

    const superAdmin = await SuperAdmin.create({
      fullName,
      email,
      phone, // Added phone
      password,
      profileImage
    });

    res.status(201).json({ message: "SuperAdmin registered successfully", superAdmin });
  } catch (error) {
    console.error("Register SuperAdmin Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ================= Login ================= */
export const loginSuperAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and Password required" });

    const superAdmin = await SuperAdmin.findOne({ email });
    if (!superAdmin || !(await superAdmin.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(superAdmin._id, superAdmin.role);
    const refreshToken = generateRefreshToken(superAdmin._id, superAdmin.role);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "strict",
      maxAge: parseInt(process.env.REFRESH_TOKEN_LIFETIME) * 1000
    });

    res.status(200).json({ message: "Login successful", superAdmin, accessToken });
  } catch (error) {
    console.error("Login SuperAdmin Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ================= Logout ================= */
export const logoutSuperAdmin = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: "strict",
    domain: process.env.COOKIE_DOMAIN
  });
  res.status(200).json({ message: "Logged out successfully" });
};

/* ================= Get Profile ================= */
export const getSuperAdminProfile = async (req, res) => {
  try {
    const superAdmin = await SuperAdmin.findById(req.user.id).select("-password");
    if (!superAdmin) return res.status(404).json({ message: "SuperAdmin not found" });
    res.status(200).json({ superAdmin });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ================= Update Profile ================= */
export const updateSuperAdminProfile = async (req, res) => {
  try {
    const superAdmin = await SuperAdmin.findById(req.user.id);
    if (!superAdmin) return res.status(404).json({ message: "SuperAdmin not found" });

    const { fullName, phone } = req.body;
    if (fullName) superAdmin.fullName = fullName;
    if (phone) superAdmin.phone = phone; // Added phone update

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "superAdmins");
      superAdmin.profileImage = result.secure_url;
    }

    await superAdmin.save();
    res.status(200).json({ message: "Profile updated", superAdmin });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
