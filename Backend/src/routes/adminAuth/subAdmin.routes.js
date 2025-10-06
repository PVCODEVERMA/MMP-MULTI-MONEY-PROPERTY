import express from "express";
import { upload } from "../../middleware/upload.js";
import {
  registerSubAdmin,
  loginSubAdmin,
  getSubAdminProfile,
  updateSubAdminProfile,
  logoutSubAdmin
} from "../../controllers/adminAuth/subAdmin.controller.js";
import { verifyAuth, verifyRole } from "../../middleware/verifyAuth.js";

const router = express.Router();

// ✅ Register (with invite secret key)
router.post("/register", upload.single("profileImage"), registerSubAdmin);

// ✅ Login
router.post("/login", loginSubAdmin);

// ✅ Logout
router.post("/logout", verifyAuth, verifyRole("SubAdmin"), logoutSubAdmin);

// ✅ Get Profile
router.get("/profile", verifyAuth, verifyRole("SubAdmin"), getSubAdminProfile);

// ✅ Update Profile
router.put("/profile", verifyAuth, verifyRole("SubAdmin"), upload.single("profileImage"), updateSubAdminProfile);

export default router;
