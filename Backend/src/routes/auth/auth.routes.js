import express from "express";
import multer from "multer";
import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  updateUserProfile,
  getAllUsers,
  forgotPassword,
  resetPassword,
} from "../../controllers/userAuth/userAuth.controller.js";
import { verifyAuth, isAdmin } from "../../middleware/verifyAuth.js";
import { upgradeUser } from "../../controllers/userAuth/userUpgrade.controller.js";

const router = express.Router();
const upload = multer();

// Register & Login
router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);


// Profile
router.get("/profile", verifyAuth, getProfile);
router.put("/profile", verifyAuth, upload.single("profileImage"), updateUserProfile);

// Admin Only
router.get("/all-users", verifyAuth, isAdmin, getAllUsers);

// Password reset
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Add the upgrade route
router.post("/upgrade", verifyAuth, upgradeUser);

export default router;
