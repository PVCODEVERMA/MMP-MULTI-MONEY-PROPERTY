import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a new order for checkout
export const createRazorpayPlane = async (req, res) => {
  try {
    const {period,name,amount,description} = req.body;
   const plane= await razorpay.plans.create({
      period: "monthly", 
      interval: 1,
      item: {
        name: "Pro Plan",
        amount: 49900,
        currency: "INR",
        description: "Monthly Pro Subscription",
      },
    });

     return res.status(200).json({plane})
   
  } catch (error) {
    res.status(500).json({ message: "Razorpay order creation failed", error });
  }
};

// Verify payment signature from frontend
export const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");
    if (generated_signature === razorpay_signature) {
      return res.json({ success: true, message: "Payment verified" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Payment verification error", error });
  }
};
