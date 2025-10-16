
import express from "express";

import {
  createProperty,
  getAllProperties,
  getPropertyById,
  deletePropertyById,
} from "../../controllers/property/property.controller.js";

import { upload } from "../../middleware/upload.js";
// import { verifyAuth } from "../../middleware/verifyAuth.js";


const router = express.Router();

//  Create new property (with images)
router.post("/create", upload.array("images", 10), createProperty);

//  Get all properties
router.get("/", getAllProperties);

//  Get single property by ID
router.get("/:id", getPropertyById);

//  Delete property by ID
router.delete("/:id", deletePropertyById);

export default router;