import express from "express";
import { upload } from "../../middleware/upload.js";
import {
  registerSuperAdmin,
  loginSuperAdmin,
  getSuperAdminProfile,
  updateSuperAdminProfile,
  logoutSuperAdmin
} from "../../controllers/adminAuth/superAdmin.controller.js";
import { verifyAuth, verifyRole } from "../../middleware/verifyAuth.js";

const router = express.Router();

// Register (with Boss Secret Key)
router.post("/register", upload.single("profileImage"), registerSuperAdmin);

// Login
router.post("/login", loginSuperAdmin);

// Logout
router.post("/logout", verifyAuth, verifyRole("SuperAdmin"), logoutSuperAdmin);

// Get Profile
router.get("/profile", verifyAuth, verifyRole("SuperAdmin"), getSuperAdminProfile);

// Update Profile
router.put("/profile", verifyAuth, verifyRole("SuperAdmin"), upload.single("profileImage"), updateSuperAdminProfile);

export default router;
