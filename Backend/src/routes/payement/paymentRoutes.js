

import express from "express";
import { createRazorpayPlane, verifyRazorpayPayment } from "../../controllers/payment/razorpay.controller.js";


const router = express.Router();

router.post("/razorpay-plane", createRazorpayPlane);      
router.post("/razorpay-verify", verifyRazorpayPayment);  

export default router;
