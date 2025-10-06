import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import toast from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext"; // <-- import your auth context

const PLAN_DETAILS = {
  "Starter Plan": {
    name: "Starter Plan",
    price: 13500,
    duration: "30 Days",
    role: "Broker", // Custom role mapping
    features: [
      "1 Project Listing", "50–70 Buyer Leads",
      "Shared with 2–3 Brokers", "Basic Dashboard Access",
    ],
  },
  "Growth Plan": {
    name: "Growth Plan",
    price: 49999,
    duration: "60 Days",
    role: "Builder",
    features: [
      "3 Project Listings", "100–150 Buyer Leads",
      "Shared with 1–2 Brokers", "Featured Listing", "Google & YouTube Ads",
    ],
  },
  "Custom Plan": {
    name: "Custom Plan",
    price: 0,
    duration: "Flexible",
    role: "Channel-Partner",
    features: [
      "Multi-city Targeting", "Custom Lead Volume",
      "Add-on Bundles", "Dedicated Campaign Manager",
    ],
  },
};

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  // Get the selected plan (from router param or state)
  const planName = params.get("plan") || "Starter Plan";
  const plan = PLAN_DETAILS[planName] || PLAN_DETAILS["Starter Plan"];

  const [selectedAddOns, setSelectedAddOns] = useState(location.state?.addOns || []);
  const [phone, setPhone] = useState("");

  // Use context to get upgrade user method and token
  const { upgradeUserPlan } = useAuth();

  const totals = useMemo(() => {
    const addOnTotal = selectedAddOns.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
      return sum + (isNaN(price) ? 0 : price);
    }, 0);
    return {
      addOnTotal,
      planPrice: plan.price,
      grandTotal: (plan.price || 0) + addOnTotal,
    };
  }, [plan, selectedAddOns]);

  const handleRemoveAddOn = (index) => {
    setSelectedAddOns((prev) => prev.filter((_, i) => i !== index));
  };

  // Call backend API after payment
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate payment success
    toast.success(`Payment request for ${plan.name} (₹${totals.grandTotal.toLocaleString()}) submitted successfully!`);

    // Call upgradeUserPlan context
    try {
      await upgradeUserPlan({
        plan: plan.name,
        addOns: selectedAddOns,
        role: plan.role, // pass correct role for plan
      });
      setTimeout(() => {
        navigate("/broker/dashboard");
      }, 1200);
    } catch (err) {
      // error already shown by upgradeUserPlan
    }

    setPhone("");
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Plan summary */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-[#164058] mb-4">{plan.name}</h2>
          <p className="text-lg font-semibold text-[#FF9C00] mb-2">
            {plan.price ? `₹${plan.price.toLocaleString()}` : "As per requirements"}
          </p>
          <p className="text-sm text-gray-500 mb-4">{plan.duration}</p>

          <h3 className="font-semibold text-[#164058] mb-2">Plan Benefits</h3>
          <ul className="space-y-2 text-sm text-gray-700 mb-6">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-orange-400 text-white text-xs">✔</span>
                {f}
              </li>
            ))}
          </ul>

          {/* Add-ons */}
          {selectedAddOns.length > 0 && (
            <>
              <h3 className="font-semibold text-[#164058] mb-2">Selected Add-ons</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {selectedAddOns.map((addOn, i) => (
                  <li key={i} className="flex justify-between items-center border-b py-2">
                    <div>
                      <span>{addOn.name}</span>
                      <p className="text-xs text-gray-500">{addOn.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{addOn.price}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAddOn(i)}
                        className="text-red-500 hover:text-red-700"
                        title="Remove add-on"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-sm text-gray-800">
                <p>
                  Add-ons Total: <strong>₹{totals.addOnTotal.toLocaleString()}</strong>
                </p>
              </div>
            </>
          )}
          {/* Grand Total */}
          <div className="mt-6 border-t pt-4 text-lg font-bold text-[#164058]">
            Grand Total:{" "}
            <span className="text-[#FF9C00]">₹{totals.grandTotal.toLocaleString()}</span>
          </div>
          <p className="mt-4 text-[12px] text-gray-500">
            * 18% GST applicable on all plans & add-ons.
          </p>
        </div>
        {/* Payment Form */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-[#164058] mb-4">Enter Your Details</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input type="text" placeholder="Full Name" required className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FF9C00] outline-none" />
            <input type="email" placeholder="Email Address" required className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FF9C00] outline-none" />
            <PhoneInput defaultCountry="in" value={phone} onChange={setPhone} className="w-full" inputClassName="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FF9C00] outline-none"/>
            <input type="text" placeholder="Company / Brokerage Name" required className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FF9C00] outline-none"/>
            <input type="text" placeholder="Card Number" required className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FF9C00] outline-none"/>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Expiry MM/YY" required className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FF9C00] outline-none"/>
              <input type="text" placeholder="CVV" required className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FF9C00] outline-none"/>
            </div>
            <button type="submit" className="w-full py-3 rounded-full bg-[#FF9C00] text-white font-semibold hover:bg-[#e68800] transition-transform hover:scale-105 cursor-pointer">
              Proceed to Pay ₹{totals.grandTotal.toLocaleString()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}



